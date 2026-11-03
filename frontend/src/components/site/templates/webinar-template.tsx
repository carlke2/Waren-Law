import type { WebinarDetail } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { ContentSections } from '@/components/site/content-sections';
import { CtaBand } from '@/components/site/cta-band';
import { FaqAccordion } from '@/components/site/faq-accordion';
import { JsonLd } from '@/components/site/json-ld';
import { PageHero } from '@/components/site/page-hero';
import { TeamCard } from '@/components/site/team-card';
import { WebinarAction } from '@/components/site/webinar-action';
import { Badge } from '@/components/ui/card';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import { getSettings } from '@/lib/api/content';
import { groupSections } from '@/lib/content/sections';
import { webinarStateLabel } from '@/lib/content/webinars';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { eventSchema, faqSchema } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils/dates';

const text = dictionary.webinars;

export async function WebinarTemplate({ webinar }: { webinar: WebinarDetail }) {
  const settings = await getSettings();
  return (
    <>
      {webinar.faq.length ? <JsonLd data={faqSchema(webinar.faq)} /> : null}
      {webinar.state === 'upcoming' ? (
        <JsonLd data={eventSchema(webinar, serverEnv().siteUrl)} />
      ) : null}
      <PageHero
        title={webinar.title}
        lead={webinar.summary}
        crumbs={[{ label: text.title, href: ROUTES.webinars }, { label: webinar.title }]}
      >
        <p className="mt-4 flex flex-wrap items-center gap-3 text-small">
          <Badge>{webinarStateLabel(webinar.state)}</Badge>
          {webinar.startsAt ? <span>{formatDate(webinar.startsAt, webinar.timezone)}</span> : null}
        </p>
        <WebinarAction webinar={webinar} />
      </PageHero>
      <ContentSections sections={groupSections(webinar.body.blocks)} />
      {webinar.panel.length ? (
        <Section tone="sand">
          <Heading level={2}>{text.panel}</Heading>
          <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {webinar.panel.map((member) => (
              <li key={member.slug}>
                <TeamCard member={member} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      {webinar.faq.length ? (
        <Section tone="white">
          <Heading level={2}>{text.faq}</Heading>
          <div className="mt-6 max-w-reading">
            <FaqAccordion items={webinar.faq} />
          </div>
        </Section>
      ) : null}
      <CtaBand settings={settings} />
    </>
  );
}
