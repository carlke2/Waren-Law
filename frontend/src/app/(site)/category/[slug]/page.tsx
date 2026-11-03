import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getCategories } from '@/lib/api/content';
import { staticParams } from '@/lib/prerender';

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
  const category = await findCategory((await params).slug);
  return category ? { title: category.name, description: category.description } : {};
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await findCategory((await params).slug);
  if (!category) notFound();
  return <InsightListing page={1} category={category} />;
}
