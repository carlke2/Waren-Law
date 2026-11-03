import type { CategoryResponse } from '@waren/shared';
import { DEFAULT_PAGE_SIZE, ROUTES } from '@waren/shared';
import type { FilterChip } from '@/components/ui/filter-chips';
import { dictionary } from '@/lib/dictionary';

export function parsePageNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  return Number(value);
}

export function pageNumbersAfterFirst(total: number): number[] {
  const pages = Math.ceil(total / DEFAULT_PAGE_SIZE);
  return Array.from({ length: Math.max(pages - 1, 0) }, (_, index) => index + 2);
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
