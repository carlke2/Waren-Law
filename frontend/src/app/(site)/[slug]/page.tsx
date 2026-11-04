import { HOME_PAGE_SLUG } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { RootTemplate, rootMetadata } from '@/components/site/templates/root-template';
import { getRootSlugs } from '@/lib/api/content';
import { loadRootContent } from '@/lib/content/root-content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/seo/metadata';

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
  await deferToRequestWhenPrerenderIsSkipped();
  const root = await loadRootContent((await params).slug);
  if (!root) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata(rootMetadata(root));
}

export default async function RootPage({ params }: RootPageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const root = await loadRootContent((await params).slug);
  if (!root) notFound();
  return <RootTemplate root={root} />;
}
