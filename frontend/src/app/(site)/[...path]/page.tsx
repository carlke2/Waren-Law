import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HoldingPage } from '@/components/site/holding-page';
import { RootTemplate, rootMetadata } from '@/components/site/templates/root-template';
import { holdingPaths, holdingTitle } from '@/lib/content/holding';
import { loadRootContent } from '@/lib/content/root-content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/seo/metadata';

interface HoldingRouteProps {
  params: Promise<{ path: string[] }>;
}

export function generateStaticParams() {
  return staticParams(async () => (await holdingPaths()).map((path) => ({ path })));
}

const rootOf = async ([first, second]: string[]) =>
  first && !second ? loadRootContent(first) : null;

export async function generateMetadata({ params }: HoldingRouteProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { path } = await params;
  const root = await rootOf(path);
  if (root) return pageMetadata(rootMetadata(root));
  const title = await holdingTitle(path);
  if (!title) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({ title, path: `/${path.join('/')}/`, noindex: true });
}

export default async function HoldingRoute({ params }: HoldingRouteProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const { path } = await params;
  const root = await rootOf(path);
  if (root) return <RootTemplate root={root} />;
  const title = await holdingTitle(path);
  if (!title) notFound();
  return <HoldingPage title={title} />;
}
