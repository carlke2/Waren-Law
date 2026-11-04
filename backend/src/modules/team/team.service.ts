import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MEMBER_TYPES,
  textListSchema,
  type TeamDetail,
  type TeamListResponse,
} from '@waren/shared';
import { z } from 'zod';
import type { Prisma } from '../../../prisma/generated/client.js';
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
import { presentOffice } from '../offices/offices.service.js';

const optionalTextList = textListSchema.nullable() satisfies z.ZodType;

@Injectable()
export class TeamService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list(practiceArea?: string): Promise<TeamListResponse> {
    const where: Prisma.TeamMemberWhereInput = {
      ...PUBLISHED,
      ...(practiceArea ? { practiceAreas: { some: { slug: practiceArea } } } : {}),
    };
    const members = await this.prisma.teamMember.findMany({
      where,
      omit: TEAM_SUMMARY_OMIT,
      include: TEAM_SUMMARY_INCLUDE,
      orderBy: { sortOrder: 'asc' },
    });
    const summaries = members.map((member) => this.present.teamSummary(member));
    return {
      total: summaries.length,
      groups: MEMBER_TYPES.map((memberType) => ({
        memberType,
        members: summaries.filter((member) => member.memberType === memberType),
      })).filter(({ members: group }) => group.length > 0),
    };
  }

  async bySlug(slug: string): Promise<TeamDetail> {
    const member = await this.prisma.teamMember.findFirst({
      where: { slug, hasProfile: true, ...PUBLISHED },
      include: {
        ...TEAM_SUMMARY_INCLUDE,
        ogImage: true,
        office: true,
        insights: {
          where: PUBLISHED_AND_APPROVED,
          omit: INSIGHT_SUMMARY_OMIT,
          include: INSIGHT_SUMMARY_INCLUDE,
          orderBy: INSIGHT_NEWEST_FIRST,
        },
      },
    });
    if (!member) throw new NotFoundException(`No team profile found for "${slug}"`);
    return {
      ...this.present.teamSummary(member),
      longBio: member.longBio === null ? null : await this.present.document(member.longBio),
      experience: optionalTextList.parse(member.experience),
      education: optionalTextList.parse(member.education),
      admissions: optionalTextList.parse(member.admissions),
      memberships: optionalTextList.parse(member.memberships),
      languages: member.languages,
      email: member.email,
      phone: member.phone,
      whatsApp: member.whatsApp,
      linkedInUrl: member.linkedInUrl,
      bookingUrl: member.bookingUrl,
      office: member.office ? presentOffice(member.office) : null,
      insights: member.insights.map((insight) => this.present.insightSummary(insight)),
      seo: this.present.seo(member),
    };
  }
}
