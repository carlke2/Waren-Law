import { DEFAULT_PAGE_SIZE } from '@waren/shared';
import { getInsights, getRedirects } from '@/lib/api/content';
import { serverEnv } from '@/lib/utils/env';
import { lastPageRedirect } from './patterns';

const MS_PER_SECOND = 1000;
const NO_ITEMS = 1;

let table = new Map<string, string>();
let insightPages: number | null = null;
let expiresAt = 0;

async function refresh(): Promise<void> {
  try {
    const [redirects, { totalPages }] = await Promise.all([
      getRedirects(),
      getInsights({ pageSize: DEFAULT_PAGE_SIZE }),
    ]);
    table = new Map(redirects.map(({ fromPath, toPath }) => [fromPath, toPath]));
    insightPages = Math.max(totalPages, NO_ITEMS);
  } catch {
    // Keep the last good values: an API outage must not break normal pages.
  }
  expiresAt = Date.now() + serverEnv().redirectCacheSeconds * MS_PER_SECOND;
}

async function ensureFresh(): Promise<void> {
  if (Date.now() >= expiresAt) await refresh();
}

export async function tableRedirect(path: string): Promise<string | null> {
  await ensureFresh();
  return table.get(path) ?? null;
}

export async function insightsPageRedirect(path: string): Promise<string | null> {
  await ensureFresh();
  return insightPages === null ? null : lastPageRedirect(path, insightPages);
}
