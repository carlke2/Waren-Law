import type { Prisma } from '../../../prisma/generated/client.js';
import { PUBLISHED } from './visibility.js';

export const NAMED_PRACTICE_AREAS = {
  where: { ...PUBLISHED, legalReviewStatus: 'approved' },
  select: { slug: true, name: true },
  orderBy: { sortOrder: 'asc' },
} satisfies Prisma.TeamMember$practiceAreasArgs;

export const TEAM_SUMMARY_INCLUDE = {
  portrait: true,
  practiceAreas: NAMED_PRACTICE_AREAS,
} satisfies Prisma.TeamMemberInclude;

export type TeamSummaryRow = Prisma.TeamMemberGetPayload<{ include: typeof TEAM_SUMMARY_INCLUDE }>;

export const INSIGHT_SUMMARY_INCLUDE = {
  featuredImage: true,
  categories: {
    where: PUBLISHED,
    select: { slug: true, name: true },
    orderBy: { sortOrder: 'asc' },
  },
  authors: {
    where: PUBLISHED,
    select: { slug: true, fullName: true, hasProfile: true },
    orderBy: { sortOrder: 'asc' },
  },
} satisfies Prisma.InsightInclude;

export type InsightSummaryRow = Prisma.InsightGetPayload<{
  include: typeof INSIGHT_SUMMARY_INCLUDE;
}>;

export const INSIGHT_NEWEST_FIRST = [
  { publishedAt: 'desc' },
  { slug: 'asc' },
] satisfies Prisma.InsightOrderByWithRelationInput[];
