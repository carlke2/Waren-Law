import type { PageResponse } from '@waren/shared';
import { dictionary } from '@/lib/utils/dictionary';
import { formatDate } from '@/lib/utils/dates';
import { BlockRenderer } from '../block-renderer';
import { PageHero } from '../page-hero';

const text = dictionary.legal;
const APPROVED = 'approved';

export function LegalTemplate({ page }: { page: PageResponse }) {
  return (
    <>
      <PageHero title={page.title} crumbs={[{ label: page.title }]} />
      <section className="bg-surface">
        <div className="site-container flex flex-col items-center py-16 sm:py-28">
          <div className="flex w-full max-w-reading flex-col gap-7">
            {page.legalReviewStatus === APPROVED ? null : (
              <p className="border-l-2 border-error pl-5 text-card-body font-semibold text-error">
                {text.needsReview}
              </p>
            )}
            {page.publishedAt ? (
              <p className="text-date text-text-subtle">
                {text.lastUpdated(formatDate(page.publishedAt))}
              </p>
            ) : null}
            <BlockRenderer blocks={page.body.blocks} />
          </div>
        </div>
      </section>
    </>
  );
}
