import type { FilterChip } from '@/lib/utils/content/filter-chip';
import { cx } from '@/lib/utils/cx';
import { SiteLink } from './site-link';

export function FilterChips({ label, chips }: { label: string; chips: readonly FilterChip[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2.5">
        {chips.map(({ key, label: chipLabel, href, active }) => (
          <li key={key}>
            <SiteLink
              href={href}
              aria-current={active ? 'page' : undefined}
              className={cx(
                'inline-flex min-h-11 items-center border px-4 py-2 text-link font-semibold',
                active
                  ? 'border-brand bg-brand text-on-brand'
                  : 'border-border-strong text-brand hover:border-brand',
              )}
            >
              {chipLabel}
            </SiteLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
