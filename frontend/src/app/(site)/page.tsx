import { FEATURED_TEAM_LIMIT, LATEST_INSIGHTS_LIMIT, ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Audience } from '@/components/site/home/audience';
import { Expertise } from '@/components/site/home/expertise';
import { Hero } from '@/components/site/home/hero';
import { HomeClosing } from '@/components/site/home/home-closing';
import { LatestInsights } from '@/components/site/home/latest-insights';
import { PartnersBand } from '@/components/site/home/partners-band';
import { Welcome } from '@/components/site/home/welcome';
import { WhyChoose } from '@/components/site/home/why-choose';
import {
  getAwards,
  getHome,
  getInsights,
  getOffices,
  getPartners,
  getPracticeAreas,
  getSettings,
  getTeam,
} from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageMetadata, seoMetadataInput } from '@/lib/utils/seo/metadata';

const PARTNER_GROUP = 'partner';

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const home = await getHome();
  if (!home) return {};
  return pageMetadata(seoMetadataInput(home.seo, home.title, ROUTES.home));
}

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [home, settings, practiceAreas, team, insights, awards, firmPartners, offices] =
    await Promise.all([
      getHome(),
      getSettings(),
      getPracticeAreas(),
      getTeam(),
      getInsights({ pageSize: LATEST_INSIGHTS_LIMIT }),
      getAwards(),
      getPartners(),
      getOffices(),
    ]);
  if (!home) notFound();

  const partners =
    team.groups
      .find(({ memberType }) => memberType === PARTNER_GROUP)
      ?.members.slice(0, FEATURED_TEAM_LIMIT) ?? [];
  const bookingLabel = settings.cta.bookingLabel;

  return (
    <>
      <Hero home={home} />
      <Welcome home={home} tagline={settings.firm.description} bookingLabel={bookingLabel} />
      <Audience cards={home.heroCards} />
      <WhyChoose points={settings.pageCopy.about.whyPoints} />
      <Expertise home={home} practiceAreas={practiceAreas} />
      <PartnersBand partners={partners} />
      <LatestInsights home={home} insights={insights.items} />
      <HomeClosing
        home={home}
        bookingLabel={bookingLabel}
        offices={offices}
        award={awards[0]}
        partners={firmPartners}
      />
    </>
  );
}
