import {
  LATEST_INSIGHTS_LIMIT,
  MENU_FEATURED_INSIGHTS,
  ROUTES,
} from '@waren/shared';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CookieConsent } from '@/components/site/cookie-consent';
import { VisitCapture } from '@/components/site/visit-capture';
import { JsonLd } from '@/components/site/json-ld';
import { SiteFooter } from '@/components/site/footer/site-footer';
import { SiteHeader } from '@/components/site/header/site-header';
import { WhatsAppButton } from '@/components/site/whatsapp-button';
import {
  getInsights,
  getOffices,
  getPartners,
  getPracticeAreas,
  getRootSlugs,
  getSettings,
  getTeam,
  getWebinars,
} from '@/lib/api/content';
import { dictionary } from '@/lib/utils/dictionary';
import { serverEnv } from '@/lib/utils/env';
import { buildHeaderMenu } from '@/lib/utils/header-menu';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageRobots } from '@/lib/utils/seo/metadata';
import { organizationSchema, websiteSchema } from '@/lib/utils/seo/schema';

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { siteUrl, siteIndexable } = serverEnv();
  const { firm, seo, siteVerification } = await getSettings();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: firm.name, template: seo.titleTemplate },
    description: seo.description,
    robots: pageRobots(siteIndexable),
    alternates: {
      types: { 'application/rss+xml': `${siteUrl}${ROUTES.feed}` },
    },
    ...(siteIndexable
      ? {
          verification: {
            google: siteVerification.google,
            other: { 'msvalidate.01': siteVerification.bing },
          },
        }
      : {}),
  };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  await deferToRequestWhenPrerenderIsSkipped();
  const [settings, offices, practiceAreas, rootSlugs, team, partners, insights, webinars] =
    await Promise.all([
      getSettings(),
      getOffices(),
      getPracticeAreas(),
      getRootSlugs(),
      getTeam(),
      getPartners(),
      getInsights({ pageSize: Math.max(LATEST_INSIGHTS_LIMIT, MENU_FEATURED_INSIGHTS) }),
      getWebinars(),
    ]);
  const { siteUrl } = serverEnv();
  const menu = buildHeaderMenu({
    team,
    partners,
    practiceAreas,
    insights: insights.items,
    webinars,
    offices,
    whatsApp: settings.whatsApp,
  });
  return (
    <>
      <JsonLd data={organizationSchema(settings, offices, siteUrl)} />
      <JsonLd data={websiteSchema(settings, siteUrl)} />
      <a
        href="#main"
        className="sr-only z-50 bg-accent p-3 text-on-accent focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {dictionary.common.skipToContent}
      </a>
      <SiteHeader menu={menu} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} practiceAreas={practiceAreas} rootSlugs={rootSlugs} />
      <WhatsAppButton whatsApp={settings.whatsApp} />
      <CookieConsent tracking={settings.tracking} />
      <VisitCapture />
    </>
  );
}
