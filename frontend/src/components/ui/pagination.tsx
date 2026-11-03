import Link from 'next/link';
import { cx } from '@/lib/utils/cx';
import { pageItems } from '@/lib/utils/pagination';

const ITEM = 'inline-flex min-h-tap min-w-tap items-center justify-center rounded-sm border px-3';

interface PaginationProps {
  current: number;
  total: number;
  hrefFor: (page: number) => string;
  labels: { navigation: string; previous: string; next: string; page: (page: number) => string };
}

export function Pagination({ current, total, hrefFor, labels }: PaginationProps) {
  if (total <= 1) return null;
  return (
    <nav aria-label={labels.navigation}>
      <ul className="flex flex-wrap items-center gap-2 text-small">
        {current > 1 ? (
          <li>
            <Link href={hrefFor(current - 1)} rel="prev" className={cx(ITEM, 'border-line-strong')}>
              {labels.previous}
            </Link>
          </li>
        ) : null}
        {pageItems(current, total).map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-label={labels.page(item)}
                aria-current={item === current ? 'page' : undefined}
                className={cx(
                  ITEM,
                  item === current
                    ? 'border-navy-900 bg-navy-900 text-on-dark'
                    : 'border-line-strong bg-surface',
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
        {current < total ? (
          <li>
            <Link href={hrefFor(current + 1)} rel="next" className={cx(ITEM, 'border-line-strong')}>
              {labels.next}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
