import { ROUTES, TEAM_FILTER_PARAM } from '@waren/shared';
import type { Metadata } from 'next';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { TeamCard } from '@/components/site/team-card';
import { FilterChips } from '@/components/ui/filter-chips';
import { Section } from '@/components/ui/layout';
import { Heading, Lead } from '@/components/ui/typography';
import { getPracticeAreas, getSettings, getTeam } from '@/lib/api/content';
import { parseTeamFilter, teamFilterChips } from '@/lib/content/team';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.team;

export const metadata: Metadata = {
  title: text.title,
  description: text.description,
  alternates: { canonical: ROUTES.team },
};

interface TeamPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const filter = parseTeamFilter((await searchParams)[TEAM_FILTER_PARAM]);
  const [team, practiceAreas, settings] = await Promise.all([
    getTeam(filter),
    getPracticeAreas(),
    getSettings(),
  ]);
  return (
    <>
      <PageHero title={text.title} lead={text.description} crumbs={[{ label: text.title }]} />
      <Section>
        <FilterChips label={text.filterLabel} chips={teamFilterChips(practiceAreas, filter)} />
        {team.total === 0 ? <Lead className="mt-8">{text.noResults}</Lead> : null}
        {team.groups.map(({ memberType, members }) => (
          <div key={memberType} className="mt-10">
            <Heading level={2}>{text.groups[memberType]}</Heading>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
              {members.map((member) => (
                <li key={member.slug}>
                  <TeamCard member={member} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
