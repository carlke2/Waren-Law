import { load } from 'cheerio';
import { config } from './config.js';
import { normaliseText } from './html-to-blocks.js';
import { fetchCached } from './wp-client.js';

export interface PageSeo {
  metaTitle: string | null;
  metaDescription: string | null;
}

export async function fetchPageSeo(path: string): Promise<PageSeo> {
  const html = (await fetchCached(`${config.baseUrl}${path}`)).toString('utf8');
  const $ = load(html);
  const title = normaliseText($('head title').first().text()).trim();
  const description = normaliseText($('meta[name="description"]').attr('content') ?? '').trim();
  return { metaTitle: title || null, metaDescription: description || null };
}
