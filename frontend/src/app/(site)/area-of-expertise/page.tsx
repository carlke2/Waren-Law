import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { PracticeAreaCard } from '@/components/site/practice-area-card';
import { Section } from '@/components/ui/layout';
import { getPracticeAreas, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata } from '@/lib/seo/metadata';

const text = dictionary.practice;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: text.index, description: text.indexLead, path: ROUTES.expertise });
}

export default async function ExpertisePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [practiceAreas, settings] = await Promise.all([getPracticeAreas(), getSettings()]);
  return (
    <>
      <PageHero title={text.index} lead={text.indexLead} crumbs={[{ label: text.index }]} />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {practiceAreas.map((area) => (
            <li key={area.slug}>
              <PracticeAreaCard area={area} />
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
