import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { SiteCta } from '@/components/home/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { PracticeCard } from '@/components/site/practice-card';
import { ButtonLink } from '@/components/ui/button-link';
import { getPracticeAreas } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata } from '@/lib/seo/metadata';

const text = dictionary.practice;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: text.index, description: text.indexLead, path: ROUTES.expertise });
}

export default async function ExpertiseIndexPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const areas = await getPracticeAreas();
  return (
    <>
      <PageHero
        title={text.index}
        eyebrow={text.indexEyebrow}
        intro={text.indexLead}
        crumbs={[{ label: dictionary.nav.practiceAreas }]}
      />
      <section className="bg-surface-alt">
        <div className="site-container grid grid-auto-practice gap-5 py-16 sm:py-28 lg:grid-cols-4">
          {areas.map((area, index) => (
            <PracticeCard key={area.slug} area={area} index={index} />
          ))}
        </div>
      </section>
      <section className="bg-surface">
        <div className="site-container flex flex-wrap items-center justify-between gap-8 py-16 sm:py-24">
          <div className="flex max-w-section-header flex-col gap-3">
            <h2 className="font-heading text-h2-compact font-medium text-brand">
              {text.helpTitle}
            </h2>
            <p className="text-intro text-text-muted">{text.helpText}</p>
          </div>
          <ButtonLink href={ROUTES.contact} variant="primary">
            {dictionary.nav.contactUs}
          </ButtonLink>
        </div>
      </section>
      <SiteCta />
    </>
  );
}
