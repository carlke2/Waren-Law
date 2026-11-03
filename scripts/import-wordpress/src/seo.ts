import { load } from 'cheerio';
import { config } from './config.js';
import { normaliseText } from './html-to-blocks.js';
import { fetchCached } from './wp-client.js';

const DOMAIN_TITLE_SUFFIX = /\s*[-–|]\s*warenlaw\.com$/i;

export interface PageSeo {
  metaTitle: string | null;
  metaDescription: string | null;
}

export async function fetchPageSeo(path: string): Promise<PageSeo> {
  const html = (await fetchCached(`${config.baseUrl}${path}`)).toString('utf8');
  const $ = load(html);
  const title = normaliseText($('head title').first().text())
    .trim()
    .replace(DOMAIN_TITLE_SUFFIX, '');
  const description = normaliseText($('meta[name="description"]').attr('content') ?? '').trim();
  return { metaTitle: title || null, metaDescription: description || null };
}
