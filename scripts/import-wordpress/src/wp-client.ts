import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { z } from 'zod';
import { config } from './config.js';

const REST_PAGE_SIZE = 100;

export const renderedSchema = z.object({ rendered: z.string() });

export const wpPageSchema = z.object({
  id: z.number(),
  slug: z.string(),
  date_gmt: z.string(),
  title: renderedSchema,
  content: renderedSchema,
});

export const wpPostSchema = wpPageSchema.extend({
  excerpt: renderedSchema,
  featured_media: z.number(),
  jetpack_featured_media_url: z.string().optional(),
  categories: z.array(z.number()),
});

export const wpCategorySchema = z.object({ id: z.number(), slug: z.string(), name: z.string() });

export const wpMediaSchema = z.object({
  id: z.number(),
  source_url: z.string(),
  alt_text: z.string(),
});

export type WpPage = z.infer<typeof wpPageSchema>;
export type WpPost = z.infer<typeof wpPostSchema>;
export type WpCategory = z.infer<typeof wpCategorySchema>;
export type WpMedia = z.infer<typeof wpMediaSchema>;

let lastRequestAt = 0;
let networkRequests = 0;

export function networkRequestCount(): number {
  return networkRequests;
}

async function waitForRateLimit(): Promise<void> {
  const wait = lastRequestAt + config.requestIntervalMs - Date.now();
  if (wait > 0) await new Promise((resolve) => setTimeout(resolve, wait));
  lastRequestAt = Date.now();
}

function cachePath(url: string): string {
  const key = createHash('sha256').update(url).digest('hex');
  return path.join(config.cacheDir, key);
}

async function fetchOnce(url: string): Promise<Response> {
  await waitForRateLimit();
  networkRequests += 1;
  return fetch(url, { headers: { 'User-Agent': config.userAgent } });
}

export async function fetchCached(url: string): Promise<Buffer> {
  const file = cachePath(url);
  const cached = await readFile(file).catch(() => null);
  if (cached) return cached;

  const response = await fetchOnce(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const body = Buffer.from(await response.arrayBuffer());
  await mkdir(config.cacheDir, { recursive: true });
  await writeFile(file, body);
  return body;
}

async function fetchCollection<T extends z.ZodType>(
  route: string,
  schema: T,
): Promise<z.output<T>[]> {
  const items: z.output<T>[] = [];
  for (let page = 1; ; page += 1) {
    const url = `${config.baseUrl}/wp-json/wp/v2/${route}?per_page=${REST_PAGE_SIZE}&page=${page}`;
    const batch = z.array(schema).parse(JSON.parse((await fetchCached(url)).toString('utf8')));
    items.push(...batch);
    if (batch.length < REST_PAGE_SIZE) return items;
  }
}

export interface WordPressContent {
  pages: WpPage[];
  posts: WpPost[];
  categories: WpCategory[];
  media: WpMedia[];
}

export async function fetchWordPressContent(): Promise<WordPressContent> {
  return {
    pages: await fetchCollection('pages', wpPageSchema),
    posts: await fetchCollection('posts', wpPostSchema),
    categories: await fetchCollection('categories', wpCategorySchema),
    media: await fetchCollection('media', wpMediaSchema),
  };
}
