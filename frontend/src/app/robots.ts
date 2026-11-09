import type { MetadataRoute } from 'next';
import { connection } from 'next/server';
import { serverEnv } from '@/lib/utils/env';

const ADMIN_PATH = '/admin/';
const SEARCH_PATH = '/search/';

export default async function robots(): Promise<MetadataRoute.Robots> {
  await connection();
  const { siteUrl, siteIndexable } = serverEnv();
  if (!siteIndexable) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: [ADMIN_PATH, SEARCH_PATH] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
