import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { WebinarCard } from '@/components/site/webinar-card';
import { Section } from '@/components/ui/layout';
import { Lead } from '@/components/ui/typography';
import { getSettings, getWebinars } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata } from '@/lib/seo/metadata';

const text = dictionary.webinars;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: text.title, description: text.lead, path: ROUTES.webinars });
}

export default async function WebinarsPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [webinars, settings] = await Promise.all([getWebinars(), getSettings()]);
  return (
    <>
      <PageHero
        title={text.title}
        lead={text.lead}
        crumbs={[
          { label: dictionary.insights.title, href: ROUTES.insights },
          { label: text.title },
        ]}
      />
      <Section>
        {webinars.length ? (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {webinars.map((webinar) => (
              <li key={webinar.slug}>
                <WebinarCard webinar={webinar} />
              </li>
            ))}
          </ul>
        ) : (
          <Lead>{text.empty}</Lead>
        )}
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
