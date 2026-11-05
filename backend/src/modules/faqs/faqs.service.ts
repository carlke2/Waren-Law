import { Injectable } from '@nestjs/common';
import { faqSchema, ROUTES, type FaqEntry } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class FaqsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<FaqEntry[]> {
    const [areas, insights, webinars] = await Promise.all([
      this.prisma.practiceArea.findMany({
        where: PUBLISHED_AND_APPROVED,
        select: { slug: true, name: true, faq: true },
        orderBy: [{ sortOrder: 'asc' }, { name: 'asc' }],
      }),
      this.prisma.insight.findMany({
        where: PUBLISHED_AND_APPROVED,
        select: { slug: true, title: true, faq: true },
        orderBy: [{ publishedAt: 'desc' }, { slug: 'asc' }],
      }),
      this.prisma.webinar.findMany({
        where: PUBLISHED_AND_APPROVED,
        select: { slug: true, title: true, faq: true },
        orderBy: { slug: 'asc' },
      }),
    ]);
    return [
      ...this.entries(areas, 'practice_area', (area) => area.name),
      ...this.entries(insights, 'insight', (insight) => insight.title),
      ...this.entries(webinars, 'webinar', (webinar) => webinar.title),
    ];
  }

  private entries<T extends { slug: string; faq: unknown }>(
    rows: readonly T[],
    sourceType: FaqEntry['sourceType'],
    title: (row: T) => string,
  ): FaqEntry[] {
    return rows.flatMap((row) =>
      faqSchema.parse(row.faq).map((item) => ({
        ...item,
        sourceType,
        sourceTitle: title(row),
        href: ROUTES.root(row.slug),
      })),
    );
  }
}
