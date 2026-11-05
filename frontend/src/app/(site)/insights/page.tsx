import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { InsightListing } from '@/components/site/insight-listing';
import { insightListHref, readInsightSearch } from '@/lib/content/insights';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';
import { pageMetadata } from '@/lib/seo/metadata';

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: dictionary.insights.title,
    description: dictionary.insights.lead,
    path: ROUTES.insights,
  });
}

interface InsightsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  const search = readInsightSearch(await searchParams);
  if (search.webinars) redirect(ROUTES.webinars);
  if (search.needsRedirect) redirect(insightListHref(1, search));
  return (
    <InsightListing
      page={1}
      {...(search.practiceArea ? { practiceArea: search.practiceArea } : {})}
      {...(search.category ? { queryCategory: search.category } : {})}
    />
  );
}
