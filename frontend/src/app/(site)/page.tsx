import { FEATURED_TEAM_LIMIT, LATEST_INSIGHTS_LIMIT, ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClientLogos } from '@/components/site/home/client-logos';
import { CtaBand } from '@/components/site/home/cta-band';
import { Expertise } from '@/components/site/home/expertise';
import { HelpIntro } from '@/components/site/home/help-intro';
import { Hero } from '@/components/site/home/hero';
import { HomeIntro } from '@/components/site/home/home-intro';
import { StatsBar } from '@/components/site/home/stats-bar';
import { LatestInsights } from '@/components/site/home/latest-insights';
import { OfficesBand } from '@/components/site/home/offices-band';
import { PartnersBand } from '@/components/site/home/partners-band';
import { RecognitionStrip } from '@/components/site/home/recognition-strip';
import { Testimonials } from '@/components/site/home/testimonials';
import { Welcome } from '@/components/site/home/welcome';
import { SourcedFaq } from '@/components/site/sourced-faq';
import {
  getAwards,
  getClientLogos,
  getFaqs,
  getHome,
  getInsights,
  getOffices,
  getPartners,
  getPracticeAreas,
  getSettings,
  getTeam,
  getTestimonials,
} from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { dictionary } from '@/lib/utils/dictionary';
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
  const [
    home,
    settings,
    practiceAreas,
    team,
    insights,
    awards,
    firmPartners,
    faqs,
    quotes,
    logos,
    offices,
  ] = await Promise.all([
    getHome(),
    getSettings(),
    getPracticeAreas(),
    getTeam(),
    getInsights({ pageSize: LATEST_INSIGHTS_LIMIT }),
    getAwards(),
    getPartners(),
    getFaqs(),
    getTestimonials(),
    getClientLogos(),
    getOffices(),
  ]);
  if (!home) notFound();

  const partners =
    team.groups
      .find(({ memberType }) => memberType === PARTNER_GROUP)
      ?.members.slice(0, FEATURED_TEAM_LIMIT) ?? [];

  return (
    <>
      <Hero home={home} />
      <HomeIntro
        title={home.pageH1}
        description={settings.firm.description}
        bookingLabel={settings.cta.bookingLabel}
        cards={home.heroCards}
      />
      <StatsBar />
      <HelpIntro />
      <Expertise home={home} practiceAreas={practiceAreas} />
      <Welcome home={home} whyPoints={settings.pageCopy.about.whyPoints} />
      <SourcedFaq items={faqs} title={dictionary.practice.faq} preview />
      <PartnersBand partners={partners} />
      <Testimonials items={quotes} />
      <ClientLogos logos={logos} />
      <LatestInsights home={home} insights={insights.items} />
      <RecognitionStrip award={awards[0]} partners={firmPartners} />
      <OfficesBand offices={offices} />
      <CtaBand home={home} whatsApp={settings.whatsApp} />
    </>
  );
}
