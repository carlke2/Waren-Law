import type { InsightSummary } from '@waren/shared';
import { ROUTES } from '@waren/shared';

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char] ?? char);

interface FeedChannel {
  title: string;
  description: string;
  siteUrl: string;
}

export function buildRssFeed(channel: FeedChannel, insights: readonly InsightSummary[]): string {
  const items = insights.map((insight) => {
    const link = `${channel.siteUrl}${ROUTES.root(insight.slug)}`;
    return [
      '<item>',
      `<title>${escapeXml(insight.title)}</title>`,
      `<link>${escapeXml(link)}</link>`,
      `<guid isPermaLink="true">${escapeXml(link)}</guid>`,
      `<description>${escapeXml(insight.excerpt)}</description>`,
      insight.publishedAt
        ? `<pubDate>${new Date(insight.publishedAt).toUTCString()}</pubDate>`
        : '',
      ...insight.categories.map(({ name }) => `<category>${escapeXml(name)}</category>`),
      '</item>',
    ].join('');
  });
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    '<channel>',
    `<title>${escapeXml(channel.title)}</title>`,
    `<link>${escapeXml(`${channel.siteUrl}${ROUTES.insights}`)}</link>`,
    `<atom:link href="${escapeXml(`${channel.siteUrl}${ROUTES.feed}`)}" rel="self" type="application/rss+xml"/>`,
    `<description>${escapeXml(channel.description)}</description>`,
    '<language>en-GB</language>',
    ...items,
    '</channel>',
    '</rss>',
  ].join('\n');
}
