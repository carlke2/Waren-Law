import type { MetadataRoute } from 'next';
import { connection } from 'next/server';
import { getCategories, getRootSlugs, getTeam } from '@/lib/api/content';
import { serverEnv } from '@/lib/utils/env';
import { sitemapEntries } from '@/lib/utils/seo/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection();
  const { siteUrl, siteIndexable } = serverEnv();
  if (!siteIndexable) return [];
  const [rootSlugs, team, categories] = await Promise.all([
    getRootSlugs(),
    getTeam(),
    getCategories(),
  ]);
  return sitemapEntries({ siteUrl, rootSlugs, team, categories });
}
