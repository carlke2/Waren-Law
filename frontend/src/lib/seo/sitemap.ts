import type { CategoryResponse, RootSlug, TeamListResponse } from '@waren/shared';
import { HOME_PAGE_SLUG, ROUTES } from '@waren/shared';

interface SitemapInput {
  siteUrl: string;
  rootSlugs: readonly RootSlug[];
  team: TeamListResponse;
  categories: readonly CategoryResponse[];
}

const STATIC_PATHS = [
  ROUTES.home,
  ROUTES.team,
  ROUTES.expertise,
  ROUTES.insights,
  ROUTES.webinars,
  ROUTES.consultation,
];

export function sitemapEntries({ siteUrl, rootSlugs, team, categories }: SitemapInput) {
  const root = rootSlugs
    .filter(({ noindex, slug }) => !noindex && slug !== HOME_PAGE_SLUG)
    .map(({ slug, updatedAt }) => ({
      url: `${siteUrl}${ROUTES.root(slug)}`,
      lastModified: updatedAt,
    }));
  const profiles = team.groups
    .flatMap(({ members }) => members)
    .filter(({ hasProfile }) => hasProfile)
    .map(({ slug }) => ({ url: `${siteUrl}${ROUTES.profile(slug)}` }));
  const categoryPages = categories
    .filter(({ insightCount }) => insightCount > 0)
    .map(({ slug }) => ({ url: `${siteUrl}${ROUTES.category(slug)}` }));
  return [
    ...STATIC_PATHS.map((path) => ({ url: `${siteUrl}${path}` })),
    ...root,
    ...profiles,
    ...categoryPages,
  ];
}
