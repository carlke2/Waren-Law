import { Injectable, NotFoundException } from '@nestjs/common';
import {
  faqSchema,
  ICON_NAMES,
  RELATED_INSIGHTS_LIMIT,
  type PracticeAreaDetail,
  type PracticeAreaSummary,
} from '@waren/shared';
import { z } from 'zod';
import type { PracticeArea, Media } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import {
  INSIGHT_NEWEST_FIRST,
  INSIGHT_SUMMARY_INCLUDE,
  INSIGHT_SUMMARY_OMIT,
  TEAM_SUMMARY_INCLUDE,
  TEAM_SUMMARY_OMIT,
} from '../content/content-queries.js';
import { PUBLISHED, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

const iconSchema = z.enum(ICON_NAMES);

type PracticeAreaRow = Omit<PracticeArea, 'body' | 'faq' | 'searchText'> & {
  heroImage: Media | null;
};

@Injectable()
export class PracticeAreasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list(): Promise<PracticeAreaSummary[]> {
    const areas = await this.prisma.practiceArea.findMany({
      where: PUBLISHED_AND_APPROVED,
      omit: { body: true, faq: true, searchText: true },
      include: { heroImage: true },
      orderBy: { sortOrder: 'asc' },
    });
    return areas.map((area) => this.summary(area));
  }

  private summary(area: PracticeAreaRow): PracticeAreaSummary {
    return {
      slug: area.slug,
      name: area.name,
      shortSummary: area.shortSummary,
      heroImage: this.present.optionalMedia(area.heroImage),
      icon: iconSchema.parse(area.icon),
      cardTitle: area.cardTitle,
      shortName: area.shortName,
      cardSummary: area.cardSummary,
    };
  }

  async bySlug(slug: string): Promise<PracticeAreaDetail> {
    const area = await this.prisma.practiceArea.findFirst({
      where: { slug, ...PUBLISHED_AND_APPROVED },
      include: {
        heroImage: true,
        ogImage: true,
        team: {
          where: PUBLISHED,
          omit: TEAM_SUMMARY_OMIT,
          include: TEAM_SUMMARY_INCLUDE,
          orderBy: { sortOrder: 'asc' },
        },
        insights: {
          where: PUBLISHED_AND_APPROVED,
          omit: INSIGHT_SUMMARY_OMIT,
          include: INSIGHT_SUMMARY_INCLUDE,
          orderBy: INSIGHT_NEWEST_FIRST,
          take: RELATED_INSIGHTS_LIMIT,
        },
      },
    });
    if (!area) throw new NotFoundException(`No practice area found for "${slug}"`);
    return {
      ...this.summary(area),
      body: await this.present.document(area.body),
      faq: faqSchema.parse(area.faq),
      team: area.team.map((member) => this.present.teamSummary(member)),
      insights: area.insights.map((insight) => this.present.insightSummary(insight)),
      seo: this.present.seo(area),
    };
  }
}
