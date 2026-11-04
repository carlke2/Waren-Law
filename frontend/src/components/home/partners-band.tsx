import { ROUTES, type HomeResponse, type TeamSummary } from '@waren/shared';
import { PortraitGrid } from '@/components/site/portrait-card';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;
interface PartnersBandProps {
  home: HomeResponse;
  partners: readonly TeamSummary[];
}

export function PartnersBand({ home, partners }: PartnersBandProps) {
  return (
    <section data-tone="dark" className="bg-brand text-on-brand">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-section-header flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span className="h-rule w-rule-short bg-accent" />
              <Eyebrow onBrand>{text.teamEyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-h2 font-medium">{home.teamTitle}</h2>
            <p className="text-intro text-on-brand-muted">{home.teamIntro}</p>
          </div>
          <ButtonLink href={ROUTES.team} variant="outline">
            {text.allPeople}
          </ButtonLink>
        </div>
        <PortraitGrid members={partners} />
      </div>
    </section>
  );
}
