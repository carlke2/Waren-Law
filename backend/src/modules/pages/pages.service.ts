import { Injectable, NotFoundException } from '@nestjs/common';
import type { PageResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class PagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async bySlug(slug: string): Promise<PageResponse> {
    const page = await this.prisma.page.findFirst({
      where: { slug, ...PUBLISHED_AND_APPROVED },
      include: { ogImage: true },
    });
    if (!page) throw new NotFoundException(`No page found for "${slug}"`);
    return {
      slug: page.slug,
      title: page.title,
      template: page.template,
      body: await this.present.document(page.body),
      publishedAt: page.publishedAt?.toISOString() ?? null,
      seo: this.present.seo(page),
    };
  }
}
