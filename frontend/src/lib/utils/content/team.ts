import type { PracticeAreaSummary } from '@waren/shared';
import { ROUTES, SLUG_PATTERN, TEAM_FILTER_PARAM } from '@waren/shared/constants';
import type { FilterChip } from './filter-chip';
import { dictionary } from '@/lib/utils/dictionary';

export function parseTeamFilter(value: string | string[] | undefined): string | undefined {
  return typeof value === 'string' && SLUG_PATTERN.test(value) ? value : undefined;
}

export function teamFilterChips(
  areas: readonly PracticeAreaSummary[],
  active: string | undefined,
): FilterChip[] {
  return [
    { key: 'all', label: dictionary.team.allAreas, href: ROUTES.team, active: !active },
    ...areas.map(({ slug, name }) => ({
      key: slug,
      label: name,
      href: `${ROUTES.team}?${TEAM_FILTER_PARAM}=${slug}`,
      active: active === slug,
    })),
  ];
}
