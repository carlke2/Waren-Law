import type { Prisma } from '../../../prisma/generated/client.js';
import { PUBLISHED } from './visibility.js';

export const NAMED_PRACTICE_AREAS = {
  where: { ...PUBLISHED, legalReviewStatus: 'approved' },
  select: { slug: true, name: true },
  orderBy: { sortOrder: 'asc' },
} satisfies Prisma.TeamMember$practiceAreasArgs;

// Summaries leave out the large JSON and search columns, which made list queries take many seconds.
export const TEAM_SUMMARY_OMIT = {
  longBio: true,
  experience: true,
  education: true,
  admissions: true,
  memberships: true,
  searchText: true,
} satisfies Prisma.TeamMemberOmit;

export const TEAM_SUMMARY_INCLUDE = {
  portrait: true,
  practiceAreas: NAMED_PRACTICE_AREAS,
} satisfies Prisma.TeamMemberInclude;

export type TeamSummaryRow = Prisma.TeamMemberGetPayload<{
  include: typeof TEAM_SUMMARY_INCLUDE;
  omit: typeof TEAM_SUMMARY_OMIT;
}>;

export const INSIGHT_SUMMARY_OMIT = {
  body: true,
  faq: true,
  searchText: true,
} satisfies Prisma.InsightOmit;

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
  omit: typeof INSIGHT_SUMMARY_OMIT;
}>;

export const INSIGHT_NEWEST_FIRST = [
  { publishedAt: 'desc' },
  { slug: 'asc' },
] satisfies Prisma.InsightOrderByWithRelationInput[];
