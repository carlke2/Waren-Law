import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getCategories } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/seo/metadata';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function findCategory(slug: string) {
  return (await getCategories()).find((category) => category.slug === slug);
}

export function generateStaticParams() {
  return staticParams(async () => (await getCategories()).map(({ slug }) => ({ slug })));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const category = await findCategory((await params).slug);
  if (!category) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    title: category.name,
    description: category.description ?? dictionary.insights.lead,
    path: ROUTES.category(category.slug),
    noindex: category.insightCount === 0,
  });
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const category = await findCategory((await params).slug);
  if (!category) notFound();
  return <InsightListing page={1} category={category} />;
}
