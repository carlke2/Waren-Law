import { FEATURED_TEAM_LIMIT, LATEST_INSIGHTS_LIMIT, ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Audience } from '@/components/home/audience';
import { ClientLogos } from '@/components/home/client-logos';
import { CtaBand } from '@/components/home/cta-band';
import { Expertise } from '@/components/home/expertise';
import { HelpIntro } from '@/components/home/help-intro';
import { Hero } from '@/components/home/hero';
import { StatsBar } from '@/components/home/stats-bar';
import { LatestInsights } from '@/components/home/latest-insights';
import { OfficesBand } from '@/components/home/offices-band';
import { PartnersBand } from '@/components/home/partners-band';
import { RecognitionStrip } from '@/components/home/recognition-strip';
import { Testimonials } from '@/components/home/testimonials';
import { Welcome } from '@/components/home/welcome';
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
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { dictionary } from '@/lib/dictionary';
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
      <Hero
        home={home}
        tagline={settings.firm.tagline}
        description={settings.firm.description}
        bookingLabel={settings.cta.bookingLabel}
      />
      <StatsBar />
      <HelpIntro />
      <Audience cards={home.heroCards} />
      <Expertise home={home} practiceAreas={practiceAreas} />
      <Welcome home={home} whyPoints={settings.pageCopy.about.whyPoints} />
      <SourcedFaq items={faqs} title={dictionary.practice.faq} preview />
      <PartnersBand home={home} partners={partners} />
      <Testimonials items={quotes} />
      <ClientLogos logos={logos} />
      <LatestInsights home={home} insights={insights.items} />
      <RecognitionStrip award={awards[0]} partners={firmPartners} />
      <OfficesBand offices={offices} />
      <CtaBand home={home} whatsApp={settings.whatsApp} />
    </>
  );
}
