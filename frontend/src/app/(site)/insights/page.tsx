import type { Metadata } from 'next';
import { InsightListing } from '@/components/site/insight-listing';
import { dictionary } from '@/lib/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';

export const metadata: Metadata = {
  title: dictionary.insights.title,
  description: dictionary.insights.lead,
};

export default async function InsightsPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  return <InsightListing page={1} />;
}
