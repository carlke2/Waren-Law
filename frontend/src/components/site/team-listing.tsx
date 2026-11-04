import { SiteCta } from '@/components/home/cta-band';
import { FilterChips } from '@/components/ui/filter-chips';
import { getPracticeAreas, getTeam } from '@/lib/api/content';
import { teamFilterChips } from '@/lib/content/team';
import { dictionary } from '@/lib/dictionary';
import { PageHero } from './page-hero';
import { PortraitGrid } from './portrait-card';

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
      <section data-tone="dark" className="bg-brand text-on-brand">
        <div className="site-container flex flex-col gap-16 py-16 sm:py-28">
          {team.total === 0 ? <p className="text-intro">{text.noResults}</p> : null}
          {team.groups.map(({ memberType, members }) => (
            <div key={memberType} className="flex flex-col gap-9">
              <h2 className="font-heading text-h2 font-medium">{text.groups[memberType]}</h2>
              <PortraitGrid members={members} />
            </div>
          ))}
        </div>
      </section>
      <SiteCta />
    </>
  );
}
