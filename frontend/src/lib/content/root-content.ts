import {
  HOME_PAGE_SLUG,
  SLUG_PATTERN,
  type InsightDetail,
  type PageResponse,
  type PracticeAreaDetail,
  type SeoResponse,
  type WebinarDetail,
} from '@waren/shared';
import {
  getInsight,
  getPage,
  getPracticeArea,
  getWebinar,
  resolveRootSlug,
} from '@/lib/api/content';

export type RootContent =
  | { type: 'page'; content: PageResponse }
  | { type: 'practice_area'; content: PracticeAreaDetail }
  | { type: 'insight'; content: InsightDetail }
  | { type: 'webinar'; content: WebinarDetail };

export async function loadRootContent(slug: string): Promise<RootContent | null> {
  if (slug === HOME_PAGE_SLUG) return null;
  if (!SLUG_PATTERN.test(slug)) return null;
  const resolved = await resolveRootSlug(slug);
  if (!resolved) return null;

  switch (resolved.type) {
    case 'page': {
      const content = await getPage(slug);
      return content && { type: 'page', content };
    }
    case 'practice_area': {
      const content = await getPracticeArea(slug);
      return content && { type: 'practice_area', content };
    }
    case 'insight': {
      const content = await getInsight(slug);
      return content && { type: 'insight', content };
    }
    case 'webinar': {
      const content = await getWebinar(slug);
      return content && { type: 'webinar', content };
    }
  }
}

export function rootContentSeo(root: RootContent): SeoResponse {
  return root.content.seo;
}
