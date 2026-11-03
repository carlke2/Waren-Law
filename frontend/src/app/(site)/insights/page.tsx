import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { InsightListing } from '@/components/site/insight-listing';
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

export default async function InsightsPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  return <InsightListing page={1} />;
}
