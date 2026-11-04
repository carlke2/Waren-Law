import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { SiteCta } from '@/components/home/cta-band';
import { LeadForm } from '@/components/site/lead-form';
import { PageHero } from '@/components/site/page-hero';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getPracticeAreas, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata } from '@/lib/seo/metadata';

const text = dictionary.consultation;
const NUMBER_WIDTH = 2;

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { pageCopy } = await getSettings();
  return pageMetadata({
    title: text.title,
    description: pageCopy.consultation.heroIntro,
    path: ROUTES.consultation,
  });
}

export default async function ConsultationPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [settings, areas] = await Promise.all([getSettings(), getPracticeAreas()]);
  const copy = settings.pageCopy.consultation;
  return (
    <>
      <PageHero
        title={text.title}
        eyebrow={dictionary.contact.eyebrow}
        intro={copy.heroIntro}
        crumbs={[{ label: text.title }]}
      />
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-7 py-16 sm:py-28">
          <h2 className="font-heading text-h2 font-medium text-brand">{text.formHeading}</h2>
          <LeadForm
            form="consultation"
            practiceAreas={areas.map(({ name }) => name)}
            submitLabel={text.submit}
          />
        </div>
      </section>
      <section className="bg-surface-alt">
        <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
          <div className="flex flex-col gap-3">
            <Eyebrow>{text.nextEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{text.nextTitle}</h2>
          </div>
          <div className="grid grid-auto-team gap-8">
            {copy.steps.map(({ title, text: stepText }, index) => (
              <div key={title} className="flex flex-col gap-2.5 border-t-2 border-brand pt-5">
                <span className="text-eyebrow font-bold text-accent-text">
                  {String(index + 1).padStart(NUMBER_WIDTH, '0')}
                </span>
                <h3 className="font-heading text-h3-card font-semibold text-brand">{title}</h3>
                <p className="text-card-body text-text-muted">{stepText}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteCta />
    </>
  );
}
