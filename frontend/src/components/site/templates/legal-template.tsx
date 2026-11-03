import type { PageResponse } from '@waren/shared';
import { BlockRenderer } from '@/components/site/block-renderer';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { Section } from '@/components/ui/layout';
import { getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';

export async function LegalTemplate({ page }: { page: PageResponse }) {
  const settings = await getSettings();
  return (
    <>
      <PageHero title={page.title} crumbs={[{ label: page.title }]} />
      <Section tone="white">
        {page.legalReviewStatus === 'needs_advocate_review' ? (
          <p
            role="note"
            className="mb-8 max-w-reading rounded-md border border-danger p-4 text-small text-danger"
          >
            {dictionary.legal.needsReview}
          </p>
        ) : null}
        <BlockRenderer blocks={page.body.blocks} />
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
