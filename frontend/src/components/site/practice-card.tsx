import { ROUTES, type PracticeAreaSummary } from '@waren/shared';
import { Icon } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.home;
const NUMBER_WIDTH = 2;

export function PracticeCard({ area, index }: { area: PracticeAreaSummary; index: number }) {
  return (
    <SiteLink
      href={ROUTES.root(area.slug)}
      className="surface-card group flex flex-col gap-4 p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="icon-badge">
          <Icon name={area.icon} className="size-6" />
        </span>
        <span className="font-heading text-eyebrow text-text-subtle">
          {String(index + 1).padStart(NUMBER_WIDTH, '0')}
        </span>
      </div>
      <h3 className="font-heading text-h3-card font-semibold">{area.cardTitle}</h3>
      <p className="text-card-body text-text-muted">{area.cardSummary}</p>
      <span className="card-action">
        {text.practiceCardLink}
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
