import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getInsights } from '@/lib/api/content';
import { pageNumbersAfterFirst, parsePageNumber } from '@/lib/content/insights';
import { dictionary } from '@/lib/dictionary';
import { staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/seo/metadata';

interface InsightsPageProps {
  params: Promise<{ page: string }>;
}

export function generateStaticParams() {
  return staticParams(async () => {
    const { total } = await getInsights({});
    return pageNumbersAfterFirst(total).map((page) => ({ page: String(page) }));
  });
}

export async function generateMetadata({ params }: InsightsPageProps): Promise<Metadata> {
  const page = parsePageNumber((await params).page);
  if (!page) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    title: `${dictionary.insights.title}: ${dictionary.pagination.page(page)}`,
    description: dictionary.insights.lead,
    path: ROUTES.insightsPage(page),
  });
}

export default async function InsightsPagedPage({ params }: InsightsPageProps) {
  const page = parsePageNumber((await params).page);
  if (!page || page === 1) notFound();
  return <InsightListing page={page} />;
}
