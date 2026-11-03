import { HOME_PAGE_SLUG } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutTemplate } from '@/components/site/templates/about-template';
import { InsightTemplate } from '@/components/site/templates/insight-template';
import { PracticeAreaTemplate } from '@/components/site/templates/practice-area-template';
import { WebinarTemplate } from '@/components/site/templates/webinar-template';
import { getRootSlugs } from '@/lib/api/content';
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
  if (!root) return {};
  const seo = rootContentSeo(root);
  return {
    title: seo.metaTitle,
    description: seo.metaDescription,
    robots: seo.noindex ? { index: false, follow: true } : undefined,
  };
}

function renderRoot(root: RootContent) {
  if (root.type === 'page' && root.content.template === 'about') {
    return <AboutTemplate page={root.content} />;
  }
  if (root.type === 'practice_area') return <PracticeAreaTemplate area={root.content} />;
  if (root.type === 'insight') return <InsightTemplate insight={root.content} />;
  if (root.type === 'webinar') return <WebinarTemplate webinar={root.content} />;
  notFound();
}

export default async function RootPage({ params }: RootPageProps) {
  const root = await loadRootContent((await params).slug);
  if (!root) notFound();
  return renderRoot(root);
}
