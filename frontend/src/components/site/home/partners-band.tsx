import { ROUTES, type TeamSummary } from '@waren/shared';
import { Icon } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { CARD_PHOTO } from '@/lib/utils/content/photo-files';
import { dictionary } from '@/lib/utils/dictionary';
import { TeamCardGrid } from './team-member-card';

const text = dictionary.home;

export async function PartnersBand({ partners }: { partners: readonly TeamSummary[] }) {
  return (
    <section className="bg-team-canvas">
      <div className="site-container flex flex-col items-center gap-10 py-16 sm:gap-12 sm:py-28">
        <div className="flex max-w-section-header flex-col items-center gap-4 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-team-wash px-4 py-1.5 text-link font-semibold text-team-accent">
            <Icon name="users" className="size-4" />
            {text.teamBadge}
          </span>
          <h2 className="font-heading text-h2 font-bold text-team-heading">{text.teamHeading}</h2>
          <p className="text-intro text-team-muted">{text.teamLead}</p>
          <span className="h-rule w-rule-long rounded-full bg-team-accent" />
        </div>
        <TeamCardGrid members={partners} photos={CARD_PHOTO} />
        <SiteLink href={ROUTES.team} className="text-link font-semibold text-team-heading hover:text-team-accent">
          {text.allPeople} {text.arrow}
        </SiteLink>
      </div>
    </section>
  );
}
