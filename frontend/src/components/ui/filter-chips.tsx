import Link from 'next/link';
import { cx } from '@/lib/utils/cx';

export interface FilterChip {
  key: string;
  label: string;
  href: string;
  active: boolean;
}

export function FilterChips({ label, chips }: { label: string; chips: readonly FilterChip[] }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li key={chip.key}>
            <Link
              href={chip.href}
              aria-current={chip.active ? 'page' : undefined}
              scroll={false}
              className={cx(
                'inline-flex min-h-tap items-center rounded-sm border px-3 py-1 text-small transition-colors duration-(--duration-calm)',
                chip.active
                  ? 'border-navy-900 bg-navy-900 text-on-dark'
                  : 'border-line-strong bg-surface text-ink hover:border-navy-900',
              )}
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
