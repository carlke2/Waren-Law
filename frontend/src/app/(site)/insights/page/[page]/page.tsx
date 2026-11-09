import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { getInsights } from '@/lib/api/content';
import {
  insightListHref,
  pageNumbersAfterFirst,
  parsePageNumber,
  readInsightSearch,
} from '@/lib/utils/content/insights';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/utils/prerender';
import { NOINDEX_FOLLOW, pageMetadata } from '@/lib/utils/seo/metadata';

interface InsightsPageProps {
  params: Promise<{ page: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return staticParams(async () => {
    const { total } = await getInsights({});
    return pageNumbersAfterFirst(total).map((page) => ({ page: String(page) }));
  });
}

export async function generateMetadata({ params }: InsightsPageProps): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const page = parsePageNumber((await params).page);
  if (!page) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata({
    title: `${dictionary.insights.title}: ${dictionary.pagination.page(page)}`,
    description: dictionary.insights.lead,
    path: ROUTES.insightsPage(page),
  });
}

export default async function InsightsPagedPage({ params, searchParams }: InsightsPageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const page = parsePageNumber((await params).page);
  if (!page || page === 1) notFound();
  const search = readInsightSearch(await searchParams);
  if (search.webinars) redirect(ROUTES.webinars);
  if (search.needsRedirect) redirect(insightListHref(page, search));
  return (
    <InsightListing
      page={page}
      {...(search.practiceArea ? { practiceArea: search.practiceArea } : {})}
      {...(search.category ? { queryCategory: search.category } : {})}
    />
  );
}
