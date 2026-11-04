import { HOME_PAGE_SLUG, ROUTES } from '@waren/shared';
import { getRootSlugs } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { loadRootContent, type RootContent } from './root-content';

const { nav } = dictionary;

const segmentsOf = (route: string) => route.split('/').filter(Boolean);
const toPath = (segments: readonly string[]) => `/${segments.join('/')}/`;

const FIXED_TITLES: Readonly<Record<string, string>> = {
  [ROUTES.search]: nav.search,
};

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
  return null;
}

export async function holdingPaths(): Promise<string[][]> {
  const rootSlugs = await getRootSlugs();
  return [
    ...Object.keys(FIXED_TITLES).map(segmentsOf),
    ...rootSlugs.filter(({ slug }) => slug !== HOME_PAGE_SLUG).map(({ slug }) => [slug]),
  ];
}
