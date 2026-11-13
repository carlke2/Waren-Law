import {
  HOME_SERVICE_COUNT,
  LATEST_INSIGHTS_LIMIT,
  ROUTES,
  type TeamListResponse,
} from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClientLogos } from '@/components/site/home/client-logos';
import { HomeFeature } from '@/components/site/home/home-feature';
import { HomeIntro } from '@/components/site/home/home-intro';
import { HomePrefooter } from '@/components/site/home/home-prefooter';
import { HomeServices } from '@/components/site/home/home-services';
import { Hero } from '@/components/site/home/hero';
import { LatestInsights } from '@/components/site/home/latest-insights';
import { PartnersBand } from '@/components/site/home/partners-band';
import {
  getClientLogos,
  getHome,
  getInsights,
  getOffices,
  getPracticeAreas,
  getSettings,
  getTeam,
  getWebinars,
} from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageMetadata, seoMetadataInput } from '@/lib/utils/seo/metadata';

function homepageMembers(team: TeamListResponse) {
  return team.groups
    .flatMap(({ members }) => members)
    .filter((member) => member.showOnHomepage)
    .sort((a, b) => a.homepageOrder - b.homepageOrder);
}

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const home = await getHome();
  if (!home) return {};
  return pageMetadata(seoMetadataInput(home.seo, home.title, ROUTES.home));
}

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [home, settings, practiceAreas, team, insights, webinars, logos, offices] =
    await Promise.all([
      getHome(),
      getSettings(),
      getPracticeAreas(),
      getTeam(),
      getInsights({ pageSize: LATEST_INSIGHTS_LIMIT }),
      getWebinars(),
      getClientLogos(),
      getOffices(),
    ]);
  if (!home) notFound();

  const feature = webinars.find((webinar) => webinar.featuredOnHome) ?? null;

  return (
    <>
      <Hero home={home} />
      <HomeIntro offices={offices} phones={settings.contact.phones} />
      <HomeServices areas={practiceAreas.slice(0, HOME_SERVICE_COUNT)} />
      <HomeFeature webinar={feature} />
      <LatestInsights home={home} insights={insights.items} />
      <ClientLogos logos={logos} />
      <PartnersBand members={homepageMembers(team)} />
      <HomePrefooter
        home={home}
        offices={offices}
        bookingLabel={settings.cta.bookingLabel}
        whatsApp={settings.whatsApp}
      />
    </>
  );
}
