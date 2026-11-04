import type { HomeResponse, PracticeAreaSummary } from '@waren/shared';
import { PracticeCard } from '@/components/site/practice-card';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;
interface ExpertiseProps {
  home: HomeResponse;
  practiceAreas: readonly PracticeAreaSummary[];
}

export function Expertise({ home, practiceAreas }: ExpertiseProps) {
  return (
    <section className="bg-surface-alt">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{text.expertiseEyebrow}</Eyebrow>
          <h2 className="font-heading text-h2 font-medium text-brand">{home.expertiseTitle}</h2>
          <p className="max-w-intro text-intro text-text-muted">{home.expertiseIntro}</p>
        </div>
        <div className="grid grid-auto-practice gap-5 lg:grid-cols-4">
          {practiceAreas.map((area, index) => (
            <PracticeCard key={area.slug} area={area} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
