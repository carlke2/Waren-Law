import { ROUTES, type PracticeAreaSummary } from '@waren/shared';
import { Icon } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;
const NUMBER_WIDTH = 2;

export function PracticeCard({ area, index }: { area: PracticeAreaSummary; index: number }) {
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
