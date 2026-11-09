import { SiteCta } from '@/components/site/home/cta-band';
import { FilterChips } from '@/components/ui/filter-chips';
import { getPracticeAreas, getTeam } from '@/lib/api/content';
import { teamFilterChips } from '@/lib/utils/content/team';
import { dictionary } from '@/lib/utils/dictionary';
import { PageHero } from './page-hero';
import { TeamCardGrid } from '@/components/site/home/team-member-card';
import { CARD_PHOTO } from '@/lib/utils/content/photo-files';

const text = dictionary.team;

export async function TeamListing({ practiceArea }: { practiceArea?: string }) {
  const [team, areas] = await Promise.all([getTeam(practiceArea), getPracticeAreas()]);
  return (
    <>
      <PageHero
        title={text.title}
        eyebrow={text.eyebrow}
        intro={text.description}
        crumbs={[{ label: dictionary.nav.people }]}
      />
      <section className="bg-surface">
        <div className="site-container py-10 sm:py-14">
          <FilterChips label={text.filterLabel} chips={teamFilterChips(areas, practiceArea)} />
        </div>
      </section>
      <section className="bg-team-canvas">
        <div className="site-container flex flex-col gap-16 py-16 sm:py-28">
          {team.total === 0 ? <p className="text-intro text-team-muted">{text.noResults}</p> : null}
          {team.groups.map(({ memberType, members }) => (
            <div key={memberType} className="flex flex-col gap-9">
              <h2 className="font-heading text-h2 font-medium text-team-heading">
                {text.groups[memberType]}
              </h2>
              <TeamCardGrid members={members} photos={CARD_PHOTO} />
            </div>
          ))}
        </div>
      </section>
      <SiteCta />
    </>
  );
}
