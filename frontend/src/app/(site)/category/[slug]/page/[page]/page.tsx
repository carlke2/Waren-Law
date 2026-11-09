import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getCategories } from '@/lib/api/content';
import { pageNumbersAfterFirst, parsePageNumber } from '@/lib/utils/content/insights';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/utils/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/utils/seo/metadata';

interface CategoryPagedProps {
  params: Promise<{ slug: string; page: string }>;
}

export function generateStaticParams() {
  return staticParams(async () =>
    (await getCategories()).flatMap(({ slug, insightCount }) =>
      pageNumbersAfterFirst(insightCount).map((page) => ({ slug, page: String(page) })),
    ),
  );
}

async function resolve({ params }: CategoryPagedProps) {
  const { slug, page: rawPage } = await params;
  const page = parsePageNumber(rawPage);
  const category = (await getCategories()).find((item) => item.slug === slug);
  return page && page > 1 && category ? { page, category } : null;
}

export async function generateMetadata(props: CategoryPagedProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const found = await resolve(props);
  if (!found) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    title: `${found.category.name}: ${dictionary.pagination.page(found.page)}`,
    description: found.category.description ?? dictionary.insights.lead,
    path: ROUTES.categoryPage(found.category.slug, found.page),
  });
}

export default async function CategoryPagedPage(props: CategoryPagedProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const found = await resolve(props);
  if (!found) notFound();
  return <InsightListing page={found.page} category={found.category} />;
}
