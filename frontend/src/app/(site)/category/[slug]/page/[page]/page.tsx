import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getCategories, getInsights } from '@/lib/api/content';
import { pageNumbersAfterFirst, parsePageNumber } from '@/lib/content/insights';
import { dictionary } from '@/lib/dictionary';
import { staticParams } from '@/lib/prerender';

interface CategoryPagedProps {
  params: Promise<{ slug: string; page: string }>;
}

export function generateStaticParams() {
  return staticParams(async () => {
    const categories = await getCategories();
    const params = await Promise.all(
      categories.map(async ({ slug }) => {
        const { total } = await getInsights({ category: slug });
        return pageNumbersAfterFirst(total).map((page) => ({ slug, page: String(page) }));
      }),
    );
    return params.flat();
  });
}

export async function generateMetadata({ params }: CategoryPagedProps): Promise<Metadata> {
  const { slug, page } = await params;
  const category = (await getCategories()).find((item) => item.slug === slug);
  const number = parsePageNumber(page);
  return category && number
    ? { title: `${category.name}: ${dictionary.pagination.page(number)}` }
    : {};
}

export default async function CategoryPagedPage({ params }: CategoryPagedProps) {
  const { slug, page } = await params;
  const number = parsePageNumber(page);
  const category = (await getCategories()).find((item) => item.slug === slug);
  if (!number || number === 1 || !category) notFound();
  return <InsightListing page={number} category={category} />;
}
