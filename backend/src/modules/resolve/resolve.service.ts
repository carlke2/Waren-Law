import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { ResolveResponse, RootSlug } from '@waren/shared';
import type { SlugType } from '../../../prisma/generated/client.js';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { pageVisibility, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class ResolveService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ENV) private readonly env: Env,
  ) {}

  private isVisible(type: SlugType, id: string): Promise<number> {
    switch (type) {
      case 'page':
        return this.prisma.page.count({ where: { id, ...pageVisibility(this.env) } });
      case 'practice_area':
        return this.prisma.practiceArea.count({ where: { id, ...PUBLISHED_AND_APPROVED } });
      case 'insight':
        return this.prisma.insight.count({ where: { id, ...PUBLISHED_AND_APPROVED } });
      case 'webinar':
        return this.prisma.webinar.count({ where: { id, ...PUBLISHED_AND_APPROVED } });
    }
  }

  async resolve(slug: string): Promise<ResolveResponse> {
    const entry = await this.prisma.slug.findUnique({ where: { slug } });
    if (!entry || !(await this.isVisible(entry.type, entry.entityId))) {
      throw new NotFoundException(`Nothing found at "${slug}"`);
    }
    return { type: entry.type, slug: entry.slug };
  }

  async listRootSlugs(): Promise<RootSlug[]> {
    const select = { slug: true, noindex: true, updatedAt: true };
    const [pages, practiceAreas, insights, webinars] = await Promise.all([
      this.prisma.page.findMany({ where: pageVisibility(this.env), select }),
      this.prisma.practiceArea.findMany({ where: PUBLISHED_AND_APPROVED, select }),
      this.prisma.insight.findMany({ where: PUBLISHED_AND_APPROVED, select }),
      this.prisma.webinar.findMany({ where: PUBLISHED_AND_APPROVED, select }),
    ]);
    const typed = (
      type: ResolveResponse['type'],
      rows: { slug: string; noindex: boolean; updatedAt: Date }[],
    ) =>
      rows.map(({ slug, noindex, updatedAt }) => ({
        type,
        slug,
        noindex,
        updatedAt: updatedAt.toISOString(),
      }));
    return [
      ...typed('page', pages),
      ...typed('practice_area', practiceAreas),
      ...typed('insight', insights),
      ...typed('webinar', webinars),
    ];
  }
}
