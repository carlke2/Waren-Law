import type { PracticeAreaDetail } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { BlockRenderer } from '@/components/site/block-renderer';
import { CtaBand } from '@/components/site/cta-band';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { InsightCard } from '@/components/site/insight-card';
import { JsonLd } from '@/components/site/json-ld';
import { PageHero } from '@/components/site/page-hero';
import { TeamCard } from '@/components/site/team-card';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import { getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { faqSchema } from '@/lib/seo/schema';

const text = dictionary.practice;

export async function PracticeAreaTemplate({ area }: { area: PracticeAreaDetail }) {
  const settings = await getSettings();
  return (
    <>
      {area.faq.length ? <JsonLd data={faqSchema(area.faq)} /> : null}
      <PageHero
        title={area.name}
        lead={area.shortSummary}
        eyebrow={text.eyebrow}
        crumbs={[{ label: text.index, href: ROUTES.expertise }, { label: area.name }]}
      />
      <Section>
        <BlockRenderer blocks={area.body.blocks} />
      </Section>
      {area.faq.length ? (
        <Section tone="white">
          <Heading level={2}>{text.faq}</Heading>
          <div className="mt-6 max-w-reading">
            <FaqAccordion items={area.faq} />
          </div>
        </Section>
      ) : null}
      {area.team.length ? (
        <Section>
          <Heading level={2}>{text.team}</Heading>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {area.team.map((member) => (
              <li key={member.slug}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      {area.insights.length ? (
        <Section tone="white">
          <Heading level={2}>{text.insights}</Heading>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {area.insights.map((insight) => (
              <li key={insight.slug}>
                <InsightCard insight={insight} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <CtaBand settings={settings} />
    </>
  );
}
