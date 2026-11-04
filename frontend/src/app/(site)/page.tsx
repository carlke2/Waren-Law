import { FEATURED_TEAM_LIMIT, LATEST_INSIGHTS_LIMIT, ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/home/cta-band';
import { Expertise } from '@/components/home/expertise';
import { Hero } from '@/components/home/hero';
import { LatestInsights } from '@/components/home/latest-insights';
import { PartnersBand } from '@/components/home/partners-band';
import { RecognitionStrip } from '@/components/home/recognition-strip';
import { Welcome } from '@/components/home/welcome';
import {
  getAwards,
  getHome,
  getInsights,
  getPartners,
  getPracticeAreas,
  getSettings,
  getTeam,
} from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata, seoMetadataInput } from '@/lib/seo/metadata';

const PARTNER_GROUP = 'partner';

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const home = await getHome();
  if (!home) return {};
  return pageMetadata(seoMetadataInput(home.seo, home.title, ROUTES.home));
}

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const [home, settings, practiceAreas, team, insights, awards, firmPartners] = await Promise.all([
    getHome(),
    getSettings(),
    getPracticeAreas(),
    getTeam(),
    getInsights({ pageSize: LATEST_INSIGHTS_LIMIT }),
    getAwards(),
    getPartners(),
  ]);
  if (!home) notFound();

  const partners =
    team.groups
      .find(({ memberType }) => memberType === PARTNER_GROUP)
      ?.members.slice(0, FEATURED_TEAM_LIMIT) ?? [];

  return (
    <>
      <Hero home={home} />
      <Welcome home={home} />
      <Expertise home={home} practiceAreas={practiceAreas} />
      <PartnersBand home={home} partners={partners} />
      <LatestInsights home={home} insights={insights.items} />
      <RecognitionStrip award={awards[0]} partners={firmPartners} />
      <CtaBand home={home} whatsApp={settings.whatsApp} />
    </>
  );
}
