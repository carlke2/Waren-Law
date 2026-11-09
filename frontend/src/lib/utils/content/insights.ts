import type { CategoryResponse } from '@waren/shared';
import {
  DEFAULT_PAGE_SIZE,
  INSIGHT_CATEGORY_PARAM,
  INSIGHT_KIND_PARAM,
  INSIGHT_KIND_WEBINARS,
  INSIGHT_PRACTICE_PARAM,
  ROUTES,
  slugSchema,
} from '@waren/shared';
import type { FilterChip } from './filter-chip';
import { dictionary } from '@/lib/utils/dictionary';

export function parsePageNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  return Number(value);
}

export function pageNumbersAfterFirst(total: number): number[] {
  const pages = Math.ceil(total / DEFAULT_PAGE_SIZE);
  return Array.from({ length: Math.max(pages - 1, 0) }, (_, index) => index + 2);
}

export interface InsightListFilters {
  practiceArea?: string | undefined;
  category?: string | undefined;
  categoryInPath?: boolean | undefined;
}

function optionalSlug(value: string | undefined): string | undefined {
  return value && slugSchema.safeParse(value).success ? value : undefined;
}

function oneParam(
  raw: Record<string, string | string[] | undefined>,
  key: string,
): string | undefined {
  const value = raw[key];
  return typeof value === 'string' ? value : undefined;
}

export function readInsightSearch(raw: Record<string, string | string[] | undefined>): {
  practiceArea?: string;
  category?: string;
  webinars: boolean;
  needsRedirect: boolean;
} {
  const practiceRaw = oneParam(raw, INSIGHT_PRACTICE_PARAM);
  const categoryRaw = oneParam(raw, INSIGHT_CATEGORY_PARAM);
  const kindRaw = oneParam(raw, INSIGHT_KIND_PARAM);
  const practiceArea = optionalSlug(practiceRaw);
  const category = optionalSlug(categoryRaw);
  return {
    ...(practiceArea ? { practiceArea } : {}),
    ...(category ? { category } : {}),
    webinars: kindRaw === INSIGHT_KIND_WEBINARS,
    needsRedirect:
      kindRaw !== undefined ||
      (practiceRaw !== undefined && practiceRaw !== practiceArea) ||
      (categoryRaw !== undefined && categoryRaw !== category),
  };
}

export function insightListHref(page: number, filters: InsightListFilters = {}): string {
  const path =
    filters.categoryInPath && filters.category
      ? ROUTES.categoryPage(filters.category, page)
      : ROUTES.insightsPage(page);
  const query = new URLSearchParams();
  if (filters.practiceArea) query.set(INSIGHT_PRACTICE_PARAM, filters.practiceArea);
  if (filters.category && !filters.categoryInPath) {
    query.set(INSIGHT_CATEGORY_PARAM, filters.category);
  }
  const text = query.toString();
  return text ? `${path}?${text}` : path;
}

export function categoryChips(
  categories: readonly CategoryResponse[],
  active: string | undefined,
): FilterChip[] {
  return [
    { key: 'all', label: dictionary.insights.all, href: ROUTES.insights, active: !active },
    ...categories
      .filter(({ insightCount }) => insightCount > 0)
      .map(({ slug, name }) => ({
        key: slug,
        label: name,
        href: ROUTES.category(slug),
        active: active === slug,
      })),
  ];
}
