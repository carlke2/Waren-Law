import { Injectable, NotFoundException } from '@nestjs/common';
import {
  faqSchema,
  RELATED_INSIGHTS_LIMIT,
  type InsightDetail,
  type InsightListResponse,
  type InsightSummary,
} from '@waren/shared';
import type { Prisma } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import {
  INSIGHT_NEWEST_FIRST,
  INSIGHT_SUMMARY_INCLUDE,
  INSIGHT_SUMMARY_OMIT,
} from '../content/content-queries.js';
import { PUBLISHED, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

interface ListOptions {
  page: number;
  pageSize: number;
  category?: string | undefined;
  practiceArea?: string | undefined;
}

@Injectable()
export class InsightsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list({
    page,
    pageSize,
    category,
    practiceArea,
  }: ListOptions): Promise<InsightListResponse> {
    const where: Prisma.InsightWhereInput = {
      ...PUBLISHED_AND_APPROVED,
      ...(category ? { categories: { some: { slug: category, ...PUBLISHED } } } : {}),
      ...(practiceArea
        ? { practiceAreas: { some: { slug: practiceArea, ...PUBLISHED_AND_APPROVED } } }
        : {}),
    };
    const [total, rows] = await Promise.all([
      this.prisma.insight.count({ where }),
      this.prisma.insight.findMany({
        where,
        omit: INSIGHT_SUMMARY_OMIT,
        include: INSIGHT_SUMMARY_INCLUDE,
        orderBy: INSIGHT_NEWEST_FIRST,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);
    return {
      items: rows.map((row) => this.present.insightSummary(row)),
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    };
  }

  async bySlug(slug: string): Promise<InsightDetail> {
    const insight = await this.prisma.insight.findFirst({
      where: { slug, ...PUBLISHED_AND_APPROVED },
      omit: { searchText: true },
      include: {
        ...INSIGHT_SUMMARY_INCLUDE,
        ogImage: true,
        practiceAreas: {
          where: PUBLISHED_AND_APPROVED,
          select: { slug: true, name: true },
          orderBy: { sortOrder: 'asc' },
        },
      },
    });
    if (!insight) throw new NotFoundException(`No insight found for "${slug}"`);
    return {
      ...this.present.insightSummary(insight),
      body: await this.present.document(insight.body),
      faq: faqSchema.parse(insight.faq),
      practiceAreas: insight.practiceAreas,
      related: await this.related(
        insight.id,
        insight.categories.map((category) => category.slug),
      ),
      seo: this.present.seo(insight),
    };
  }

  private async related(id: string, categorySlugs: string[]): Promise<InsightSummary[]> {
    const rows = await this.prisma.insight.findMany({
      where: {
        ...PUBLISHED_AND_APPROVED,
        id: { not: id },
        categories: { some: { slug: { in: categorySlugs } } },
      },
      omit: INSIGHT_SUMMARY_OMIT,
      include: INSIGHT_SUMMARY_INCLUDE,
      orderBy: INSIGHT_NEWEST_FIRST,
      take: RELATED_INSIGHTS_LIMIT,
    });
    return rows.map((row) => this.present.insightSummary(row));
  }
}
