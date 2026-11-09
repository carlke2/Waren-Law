import { ROUTES, WEBINAR_STATES } from '@waren/shared';
import type { Metadata } from 'next';
import { SiteCta } from '@/components/site/home/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { WebinarCard } from '@/components/site/webinar-card';
import { getWebinars } from '@/lib/api/content';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageMetadata } from '@/lib/utils/seo/metadata';

const text = dictionary.webinars;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: text.title, description: text.lead, path: ROUTES.webinars });
}

export default async function WebinarsPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const webinars = await getWebinars();
  const groups = WEBINAR_STATES.flatMap((state) => {
    const items = webinars.filter((webinar) => webinar.state === state);
    return items.length ? [{ state, items }] : [];
  });
  return (
    <>
      <PageHero
        title={text.title}
        eyebrow={dictionary.home.insightsEyebrow}
        intro={text.lead}
        crumbs={[
          { label: dictionary.insights.title, href: ROUTES.insights },
          { label: text.title },
        ]}
      />
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-16 py-16 sm:py-28">
          {groups.length ? null : <p className="text-intro text-text-muted">{text.empty}</p>}
          {groups.map(({ state, items }) => (
            <div key={state} className="flex flex-col gap-9">
              <h2 className="font-heading text-h2 font-medium text-brand">{text.groups[state]}</h2>
              <div className="grid grid-auto-insight gap-7 lg:grid-cols-3">
                {items.map((webinar) => (
                  <WebinarCard key={webinar.slug} webinar={webinar} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <SiteCta />
    </>
  );
}
