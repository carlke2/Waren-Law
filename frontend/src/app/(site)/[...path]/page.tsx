import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HoldingPage } from '@/components/site/holding-page';
import { holdingPaths, holdingTitle } from '@/lib/content/holding';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/seo/metadata';

interface HoldingRouteProps {
  params: Promise<{ path: string[] }>;
}

export function generateStaticParams() {
  return staticParams(async () => (await holdingPaths()).map((path) => ({ path })));
}

export async function generateMetadata({ params }: HoldingRouteProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { path } = await params;
  const title = await holdingTitle(path);
  if (!title) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({ title, path: `/${path.join('/')}/`, noindex: true });
}

export default async function HoldingRoute({ params }: HoldingRouteProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const title = await holdingTitle((await params).path);
  if (!title) notFound();
  return <HoldingPage title={title} />;
}
