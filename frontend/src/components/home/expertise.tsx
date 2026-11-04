import { ROUTES, type HomeResponse, type PracticeAreaSummary } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Icon } from '@/components/ui/icon';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;
const NUMBER_WIDTH = 2;

function PracticeCard({ area, index }: { area: PracticeAreaSummary; index: number }) {
  return (
    <SiteLink
      href={ROUTES.root(area.slug)}
      className="group flex flex-col gap-3.5 border border-b-card-rule border-border border-b-brand bg-surface px-7 py-8 text-text transition-colors hover:border-brand"
    >
      <div className="flex items-center justify-between">
        <Icon name={area.icon} className="size-8 text-brand" />
        <span className="text-eyebrow font-bold text-accent-text">
          {String(index + 1).padStart(NUMBER_WIDTH, '0')}
        </span>
      </div>
      <h3 className="font-heading text-h3-card font-semibold text-brand">{area.cardTitle}</h3>
      <p className="text-card-body text-text-muted">{area.cardSummary}</p>
      <span className="mt-auto text-link font-bold text-brand">
        {text.practiceCardLink}{' '}
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-1"
        >
          {text.arrow}
        </span>
      </span>
    </SiteLink>
  );
}

interface ExpertiseProps {
  home: HomeResponse;
  practiceAreas: readonly PracticeAreaSummary[];
}

export function Expertise({ home, practiceAreas }: ExpertiseProps) {
  return (
    <section className="bg-surface-alt">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-22 lg:py-28">
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
