import { FEED_ITEM_LIMIT } from '@waren/shared';
import { getInsights, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/utils/dictionary';
import { serverEnv } from '@/lib/utils/env';
import { buildRssFeed } from '@/lib/utils/seo/feed';

export async function GET(): Promise<Response> {
  const { siteUrl, revalidateSeconds } = serverEnv();
  const [settings, insights] = await Promise.all([
    getSettings(),
    getInsights({ pageSize: FEED_ITEM_LIMIT }),
  ]);
  const feed = buildRssFeed(
    {
      title: `${dictionary.insights.title} | ${settings.firm.name}`,
      description: dictionary.insights.lead,
      siteUrl,
    },
    insights.items,
  );
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': `public, max-age=${revalidateSeconds}`,
    },
  });
}
