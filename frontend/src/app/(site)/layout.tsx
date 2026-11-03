import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { CookieConsent } from '@/components/site/cookie-consent';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { WhatsAppButton } from '@/components/site/whatsapp-button';
import { getOffices, getPracticeAreas, getRootSlugs, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';

export async function generateMetadata(): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { firm } = await getSettings();
  return { title: firm.name, description: firm.tagline };
}

export default async function SiteLayout({ children }: { children: ReactNode }) {
  await deferToRequestWhenPrerenderIsSkipped();
  const [settings, offices, practiceAreas, rootSlugs] = await Promise.all([
    getSettings(),
    getOffices(),
    getPracticeAreas(),
    getRootSlugs(),
  ]);
  return (
    <>
      <a
        href="#main"
        className="sr-only z-50 bg-gold-500 p-3 text-navy-900 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {dictionary.common.skipToContent}
      </a>
      <SiteHeader settings={settings} practiceAreas={practiceAreas} />
      <main id="main">{children}</main>
      <SiteFooter
        settings={settings}
        offices={offices}
        practiceAreas={practiceAreas}
        rootSlugs={rootSlugs}
      />
      <WhatsAppButton whatsApp={settings.whatsApp} />
      <CookieConsent tracking={settings.tracking} />
    </>
  );
}
