import { Inject, Injectable } from '@nestjs/common';
import {
  blockDocumentSchema,
  type InsightSummary,
  type MediaRef,
  type ResolvedDocument,
  type SeoResponse,
  type TeamSummary,
} from '@waren/shared';
import type { Media, Prisma } from '../../../prisma/generated/client.js';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import type { InsightSummaryRow, TeamSummaryRow } from './content-queries.js';

interface SeoRow {
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  noindex: boolean;
  ogImage?: Media | null;
}

@Injectable()
export class ContentPresenter {
  private readonly mediaBaseUrl: string;

  constructor(
    private readonly prisma: PrismaService,
    @Inject(ENV) env: Env,
  ) {
    this.mediaBaseUrl = env.PUBLIC_MEDIA_BASE_URL.replace(/\/$/, '');
  }

  media(media: Media): MediaRef {
    return {
      url: `${this.mediaBaseUrl}/${media.fileName}`,
      alt: media.altText,
      width: media.width,
      height: media.height,
    };
  }

  optionalMedia(media: Media | null | undefined): MediaRef | null {
    return media ? this.media(media) : null;
  }

  seo(row: SeoRow): SeoResponse {
    return {
      metaTitle: row.metaTitle,
      metaDescription: row.metaDescription,
      canonicalUrl: row.canonicalUrl,
      noindex: row.noindex,
      ogImage: this.optionalMedia(row.ogImage),
    };
  }

  async document(stored: Prisma.JsonValue): Promise<ResolvedDocument> {
    const document = blockDocumentSchema.parse(stored);
    const mediaIds = document.blocks.flatMap((block) =>
      block.type === 'image' ? [block.mediaId] : [],
    );
    const media = mediaIds.length
      ? await this.prisma.media.findMany({ where: { id: { in: mediaIds } } })
      : [];
    const byId = new Map(media.map((item) => [item.id, item]));
    return {
      version: document.version,
      blocks: document.blocks.flatMap((block): ResolvedDocument['blocks'] => {
        if (block.type !== 'image') return [block];
        const item = byId.get(block.mediaId);
        return item ? [{ ...block, media: this.media(item) }] : [];
      }),
    };
  }

  teamSummary(row: TeamSummaryRow): TeamSummary {
    return {
      slug: row.slug,
      fullName: row.fullName,
      displayName: row.displayName,
      roleTitle: row.roleTitle,
      memberType: row.memberType,
      isAdvocate: row.isAdvocate,
      hasProfile: row.hasProfile,
      shortBio: row.shortBio,
      portrait: this.optionalMedia(row.portrait),
      practiceAreas: row.practiceAreas,
    };
  }

  insightSummary(row: InsightSummaryRow): InsightSummary {
    return {
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      readingMinutes: row.readingMinutes,
      publishedAt: row.publishedAt?.toISOString() ?? null,
      featuredImage: this.optionalMedia(row.featuredImage),
      categories: row.categories,
      authors: row.authors,
    };
  }
}
