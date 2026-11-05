import { ROUTES, type PracticeAreaDetail } from '@waren/shared';
import { SiteCta } from '@/components/home/cta-band';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SectionHeading } from '@/components/ui/section-heading';
import { dictionary } from '@/lib/dictionary';
import { BlockRenderer } from '../block-renderer';
import { FaqList } from '../faq-list';
import { InsightsBand } from '../insights-band';
import { PageHero } from '../page-hero';
import { TeamGrid } from '../team-photo';

const text = dictionary.practice;

export function PracticeAreaTemplate({ area }: { area: PracticeAreaDetail }) {
  return (
    <>
      <PageHero
        title={area.name}
        eyebrow={text.eyebrow}
        intro={area.cardSummary || area.shortSummary}
        crumbs={[
          { label: dictionary.nav.practiceAreas, href: ROUTES.expertise },
          { label: area.name },
        ]}
      />
      <section className="bg-surface">
        <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
          <div className="flex min-w-0 flex-welcome-title flex-col gap-4">
            <Eyebrow>{text.overviewEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{text.overview}</h2>
            <span className="mt-2 h-rule w-rule-long bg-accent" />
          </div>
          <BlockRenderer blocks={area.body.blocks} className="min-w-0 flex-welcome-body" />
        </div>
      </section>
      {area.team.length ? (
        <section data-tone="dark" className="bg-brand text-on-brand">
          <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
            <SectionHeading eyebrow={text.teamEyebrow} title={text.team} onBrand />
            <TeamGrid members={area.team} />
          </div>
        </section>
      ) : null}
      <FaqList items={area.faq} />
      <InsightsBand title={text.insights} insights={area.insights} />
      <SiteCta />
    </>
  );
}
