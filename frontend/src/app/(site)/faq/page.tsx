import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { SiteCta } from '@/components/site/home/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { SourcedFaq } from '@/components/site/sourced-faq';
import { getFaqs } from '@/lib/api/content';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageMetadata } from '@/lib/utils/seo/metadata';

const text = dictionary.faqPage;

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  return pageMetadata({ title: text.title, description: text.lead, path: ROUTES.faq });
}

export default async function FaqPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const faqs = await getFaqs();
  return (
    <>
      <PageHero
        title={text.title}
        eyebrow={text.eyebrow}
        intro={text.lead}
        crumbs={[{ label: text.title }]}
      />
      {faqs.length ? (
        <SourcedFaq items={faqs} title={text.title} showHeading={false} />
      ) : (
        <section className="bg-surface">
          <p className="site-container py-16 text-body text-text-body sm:py-28">{text.empty}</p>
        </section>
      )}
      <SiteCta />
    </>
  );
}
