import { Injectable, NotFoundException } from '@nestjs/common';
import { faqSchema, type PracticeAreaDetail, type PracticeAreaSummary } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import {
  INSIGHT_NEWEST_FIRST,
  INSIGHT_SUMMARY_INCLUDE,
  TEAM_SUMMARY_INCLUDE,
} from '../content/content-queries.js';
import { PUBLISHED, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class PracticeAreasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list(): Promise<PracticeAreaSummary[]> {
    const areas = await this.prisma.practiceArea.findMany({
      where: PUBLISHED_AND_APPROVED,
      include: { heroImage: true },
      orderBy: { sortOrder: 'asc' },
    });
    return areas.map((area) => ({
      slug: area.slug,
      name: area.name,
      shortSummary: area.shortSummary,
      heroImage: this.present.optionalMedia(area.heroImage),
    }));
  }

  async bySlug(slug: string): Promise<PracticeAreaDetail> {
    const area = await this.prisma.practiceArea.findFirst({
      where: { slug, ...PUBLISHED_AND_APPROVED },
      include: {
        heroImage: true,
        ogImage: true,
        team: {
          where: PUBLISHED,
          include: TEAM_SUMMARY_INCLUDE,
          orderBy: { sortOrder: 'asc' },
        },
        insights: {
          where: PUBLISHED_AND_APPROVED,
          include: INSIGHT_SUMMARY_INCLUDE,
          orderBy: INSIGHT_NEWEST_FIRST,
        },
      },
    });
    if (!area) throw new NotFoundException(`No practice area found for "${slug}"`);
    return {
      slug: area.slug,
      name: area.name,
      shortSummary: area.shortSummary,
      heroImage: this.present.optionalMedia(area.heroImage),
      body: await this.present.document(area.body),
      faq: faqSchema.parse(area.faq),
      team: area.team.map((member) => this.present.teamSummary(member)),
      insights: area.insights.map((insight) => this.present.insightSummary(insight)),
      seo: this.present.seo(area),
    };
  }
}
