import { HOME_PAGE_SLUG, type PageResponse } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutTemplate } from '@/components/site/templates/about-template';
import { ContactTemplate } from '@/components/site/templates/contact-template';
import { LegalTemplate } from '@/components/site/templates/legal-template';
import { PartnersTemplate } from '@/components/site/templates/partners-template';
import { InsightTemplate } from '@/components/site/templates/insight-template';
import { PracticeAreaTemplate } from '@/components/site/templates/practice-area-template';
import { WebinarTemplate } from '@/components/site/templates/webinar-template';
import { getRootSlugs } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { loadRootContent, rootContentSeo, type RootContent } from '@/lib/content/root-content';
import { staticParams } from '@/lib/prerender';

interface RootPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticParams(async () =>
    (await getRootSlugs())
      .filter(({ slug }) => slug !== HOME_PAGE_SLUG)
      .map(({ slug }) => ({ slug })),
  );
}

export async function generateMetadata({ params }: RootPageProps): Promise<Metadata> {
  const root = await loadRootContent((await params).slug);
  if (!root) return { title: dictionary.notFound.title, robots: { index: false, follow: true } };
  const seo = rootContentSeo(root);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    robots: seo.noindex ? { index: false, follow: true } : undefined,
  };
}

function renderPage(page: PageResponse) {
  switch (page.template) {
    case 'about':
      return <AboutTemplate page={page} />;
    case 'contact':
      return <ContactTemplate page={page} />;
    case 'partners':
      return <PartnersTemplate page={page} />;
    case 'legal':
      return <LegalTemplate page={page} />;
    case 'home':
      notFound();
  }
}

function renderRoot(root: RootContent) {
  switch (root.type) {
    case 'page':
      return renderPage(root.content);
    case 'practice_area':
      return <PracticeAreaTemplate area={root.content} />;
    case 'insight':
      return <InsightTemplate insight={root.content} />;
    case 'webinar':
      return <WebinarTemplate webinar={root.content} />;
  }
}

export default async function RootPage({ params }: RootPageProps) {
  const root = await loadRootContent((await params).slug);
  if (!root) notFound();
  return renderRoot(root);
}
