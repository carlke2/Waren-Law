import { dictionary } from '@/lib/utils/dictionary';
import { cx } from '@/lib/utils/cx';
import { pageItems } from '@/lib/utils/pagination';
import { SiteLink } from './site-link';

const labels = dictionary.pagination;
const ITEM =
  'inline-flex min-h-11 min-w-11 items-center justify-center border px-3 text-link font-semibold';

interface PaginationProps {
  current: number;
  total: number;
  hrefFor: (page: number) => string;
}

export function Pagination({ current, total, hrefFor }: PaginationProps) {
  if (total <= 1) return null;
  return (
    <nav aria-label={labels.navigation}>
      <ul className="flex flex-wrap items-center gap-2">
        {current > 1 ? (
          <li>
            <SiteLink
              href={hrefFor(current - 1)}
              rel="prev"
              className={cx(ITEM, 'border-border-strong text-brand')}
            >
              {labels.previous}
            </SiteLink>
          </li>
        ) : null}
        {pageItems(current, total).map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1">
              {labels.gap}
            </li>
          ) : (
            <li key={item}>
              <SiteLink
                href={hrefFor(item)}
                aria-label={labels.page(item)}
                aria-current={item === current ? 'page' : undefined}
                className={cx(
                  ITEM,
                  item === current
                    ? 'border-brand bg-brand text-on-brand'
                    : 'border-border-strong text-brand',
                )}
              >
                {item}
              </SiteLink>
            </li>
          ),
        )}
        {current < total ? (
          <li>
            <SiteLink
              href={hrefFor(current + 1)}
              rel="next"
              className={cx(ITEM, 'border-border-strong text-brand')}
            >
              {labels.next}
            </SiteLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
