import { ROUTES, type TeamSummary } from '@waren/shared';
import { CARD_PHOTO } from '@/lib/utils/content/photo-files';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { ArrowLink, CARD_HOVER_LINE } from './home-links';
import { SectionHeading } from './section-heading';
import { TeamCardGrid } from './team-member-card';

const text = dictionary.home;

export async function PartnersBand({ partners }: { partners: readonly TeamSummary[] }) {
  return (
    <HomeSection tone="plain">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={text.teamBadge} title={text.teamHeading} intro={text.teamLead} />
        <ArrowLink href={ROUTES.team}>{text.allPeople}</ArrowLink>
      </div>
      <TeamCardGrid members={partners} photos={CARD_PHOTO} className={CARD_HOVER_LINE} />
    </HomeSection>
  );
}
