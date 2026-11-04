import { HOME_PAGE_SLUG, ROUTES } from '@waren/shared';
import { getCategories, getRootSlugs, getTeam, getTeamMember } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { loadRootContent, type RootContent } from './root-content';

const { nav } = dictionary;

const segmentsOf = (route: string) => route.split('/').filter(Boolean);
const toPath = (segments: readonly string[]) => `/${segments.join('/')}/`;

const FIXED_TITLES: Readonly<Record<string, string>> = {
  [ROUTES.team]: nav.people,
  [ROUTES.expertise]: nav.practiceAreas,
  [ROUTES.insights]: nav.insights,
  [ROUTES.webinars]: nav.webinars,
  [ROUTES.search]: nav.search,
};

const [TEAM_SEGMENT = ''] = segmentsOf(ROUTES.team);
const [CATEGORY_SEGMENT = ''] = segmentsOf(ROUTES.category('x'));

function rootTitle(root: RootContent): string {
  return root.type === 'practice_area' ? root.content.name : root.content.title;
}

export async function holdingTitle(segments: readonly string[]): Promise<string | null> {
  const fixed = FIXED_TITLES[toPath(segments)];
  if (fixed) return fixed;
  const [first, second, ...rest] = segments;
  if (!first || rest.length) return null;
  if (!second) {
    const root = await loadRootContent(first);
    return root && rootTitle(root);
  }
  if (first === TEAM_SEGMENT) return (await getTeamMember(second))?.fullName ?? null;
  if (first === CATEGORY_SEGMENT) {
    const categories = await getCategories();
    return categories.find(({ slug }) => slug === second)?.name ?? null;
  }
  return null;
}

export async function holdingPaths(): Promise<string[][]> {
  const [rootSlugs, team, categories] = await Promise.all([
    getRootSlugs(),
    getTeam(),
    getCategories(),
  ]);
  return [
    ...Object.keys(FIXED_TITLES).map(segmentsOf),
    ...rootSlugs.filter(({ slug }) => slug !== HOME_PAGE_SLUG).map(({ slug }) => [slug]),
    ...team.groups
      .flatMap(({ members }) => members)
      .filter(({ hasProfile }) => hasProfile)
      .map(({ slug }) => [TEAM_SEGMENT, slug]),
    ...categories.map(({ slug }) => [CATEGORY_SEGMENT, slug]),
  ];
}
