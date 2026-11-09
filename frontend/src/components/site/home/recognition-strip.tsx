import type { AwardResponse, PartnerResponse } from '@waren/shared';
import { LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.home;

interface RecognitionStripProps {
  award: AwardResponse | undefined;
  partners: readonly PartnerResponse[];
}

export function RecognitionStrip({ award, partners }: RecognitionStripProps) {
  if (!award && !partners.length) return null;
  return (
    <section className="border-t border-border bg-surface-alt">
      <div className="site-container flex flex-wrap items-center justify-between gap-8 py-16 sm:py-14">
        {award ? (
          <div className="flex min-w-0 flex-recognition items-center gap-5">
            <LineSvg className="size-11 shrink-0 text-accent-text">
              <circle cx="12" cy="9" r="6" />
              <path d="M8.5 14.2L7 22l5-3 5 3-1.5-7.8" />
            </LineSvg>
            <div className="flex flex-col">
              <span className="text-category font-bold tracking-category text-accent-text uppercase">
                {text.awardLabel(award.awarder, award.year)}
              </span>
              <span className="font-heading text-recognition text-brand">{award.name}</span>
            </div>
          </div>
        ) : null}
        {partners.length ? (
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-link font-semibold text-text-body">
            <span className="font-medium text-text-subtle">{text.partnersLabel}</span>
            {partners.map(({ slug, name }) => (
              <span key={slug}>{name}</span>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
