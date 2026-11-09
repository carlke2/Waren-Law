import type { MediaRef, SeoResponse } from '@waren/shared';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/api/content';
import { serverEnv } from '@/lib/utils/env';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';

const BRAND_IN_TITLE = /waren/i;
export const NOT_INDEXED = { index: false, follow: false } as const;
export const NOINDEX_FOLLOW = { index: false, follow: true } as const;

interface PageMetadataInput {
  title: string;
  description?: string | null | undefined;
  path: string;
  image?: MediaRef | null | undefined;
  noindex?: boolean | undefined;
  article?: { publishedTime: string | null; authors: readonly string[] } | undefined;
}

export function pageRobots(indexable: boolean, noindex = false): Metadata['robots'] {
  if (!indexable) return NOT_INDEXED;
  return noindex ? NOINDEX_FOLLOW : undefined;
}

export function resolveTitle(title: string): Metadata['title'] {
  return BRAND_IN_TITLE.test(title) ? { absolute: title } : title;
}

export async function pageMetadata(input: PageMetadataInput): Promise<Metadata> {
  await deferToRequestWhenPrerenderIsSkipped();
  const { siteUrl, siteIndexable } = serverEnv();
  const settings = await getSettings();
  const description = input.description ?? settings.seo.description;
  const image = input.image ?? settings.seo.media;
  const url = `${siteUrl}${input.path}`;
  const images = [
    {
      url: image.url,
      alt: image.alt,
      ...(image.width ? { width: image.width } : {}),
      ...(image.height ? { height: image.height } : {}),
    },
  ];
  return {
    title: resolveTitle(input.title),
    description,
    alternates: { canonical: url },
    robots: pageRobots(siteIndexable, input.noindex),
    openGraph: {
      title: input.title,
      description,
      url,
      siteName: settings.firm.name,
      locale: 'en_GB',
      images,
      ...(input.article
        ? {
            type: 'article' as const,
            ...(input.article.publishedTime ? { publishedTime: input.article.publishedTime } : {}),
            authors: [...input.article.authors],
          }
        : { type: 'website' as const }),
    },
    twitter: {
      card: 'summary_large_image',
      title: input.title,
      description,
      images: [image.url],
    },
  };
}

export function seoMetadataInput(seo: SeoResponse, fallbackTitle: string, path: string) {
  return {
    title: seo.metaTitle ?? fallbackTitle,
    description: seo.metaDescription,
    path: seo.canonicalUrl ?? path,
    image: seo.ogImage,
    noindex: seo.noindex,
  };
}
