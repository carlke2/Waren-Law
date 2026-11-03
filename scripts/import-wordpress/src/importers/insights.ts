import { load } from 'cheerio';
import { z } from 'zod';
import { faqSchema, type FaqItem } from '@waren/shared';
import { claimSlug } from '../../../../backend/src/database/slug-registry.js';
import { resolveImages, toDocument } from '../blocks.js';
import {
  AUTHOR_BIO_PATTERN,
  CATEGORY_PRACTICE_AREAS,
  COMMON_SKIPPED_WIDGETS,
  FIRST_PERSON_AUTHOR_PATTERN,
  MERGED_CATEGORIES,
  READING_WORDS_PER_MINUTE,
  UNCATEGORISED_INSIGHT_CATEGORIES,
} from '../curation.js';
import type { Database } from '../database.js';
import { blocksToPlainText, blockText, htmlToBlocks, htmlToPlainText } from '../html-to-blocks.js';
import { toKebabCase, type MediaLibrary } from '../media.js';
import { fetchPageSeo } from '../seo.js';
import { ImportReport, sameIds, syncRecord } from '../sync.js';
import type { WpCategory, WpPost } from '../wp-client.js';
import { assertNoBannedClaims, publishedAt } from './shared.js';

const EXCERPT_ELLIPSIS = /\s*\[(?:…|&hellip;|\.\.\.)\]\s*$/;
const FALLBACK_ALT_PREFIX = 'Illustration for the article';

const faqPageSchema = z.object({
  '@type': z.literal('FAQPage'),
  mainEntity: z.array(
    z.object({ name: z.string(), acceptedAnswer: z.object({ text: z.string() }) }),
  ),
});

export function extractFaq(html: string): FaqItem[] {
  const $ = load(html, null, false);
  for (const script of $('script[type="application/ld+json"]').toArray()) {
    const parsed = faqPageSchema.safeParse(JSON.parse($(script).text()));
    if (parsed.success) {
      return faqSchema.parse(
        parsed.data.mainEntity.map(({ name, acceptedAnswer }) => ({
          question: htmlToPlainText(name),
          answer: htmlToPlainText(acceptedAnswer.text),
        })),
      );
    }
  }
  return [];
}

export function detectAuthorSlugs(text: string): string[] {
  const authors = new Set<string>();
  for (const pattern of [AUTHOR_BIO_PATTERN, FIRST_PERSON_AUTHOR_PATTERN]) {
    const name = text.match(pattern)?.[1];
    if (name) authors.add(toKebabCase(name));
  }
  return [...authors];
}

function categorySlugsFor(post: WpPost, slugById: ReadonlyMap<number, string>): string[] {
  const slugs = post.categories.flatMap((id) => {
    const slug = slugById.get(id);
    return slug ? [MERGED_CATEGORIES[slug] ?? slug] : [];
  });
  const mapped = UNCATEGORISED_INSIGHT_CATEGORIES[post.slug];
  const all = mapped ? [...slugs, mapped] : slugs;
  return [...new Set(all.filter((slug) => slug !== 'uncategorized'))];
}

function readingMinutes(text: string): number {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / READING_WORDS_PER_MINUTE));
}

interface InsightLookups {
  categoryIds: ReadonlyMap<string, string>;
  practiceIds: ReadonlyMap<string, string>;
  teamIds: ReadonlyMap<string, string>;
  categorySlugById: ReadonlyMap<number, string>;
  normaliseHref: (href: string) => string;
}

async function importInsight(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  post: WpPost,
  lookups: InsightLookups,
): Promise<void> {
  const title = htmlToPlainText(post.title.rendered);
  const parsed = htmlToBlocks(post.content.rendered, {
    skipWidgets: COMMON_SKIPPED_WIDGETS.filter((widget) => widget !== 'image'),
    normaliseHref: lookups.normaliseHref,
  }).filter((block) => !(block.type === 'heading' && blockText(block) === title));
  const blocks = await resolveImages(
    parsed,
    media,
    `insight-${post.slug}`,
    `${FALLBACK_ALT_PREFIX} ${title}`,
  );
  const text = blocksToPlainText(blocks);
  try {
    assertNoBannedClaims(blocks, post.slug);
  } catch (error) {
    report.warnings.push((error as Error).message);
  }

  const featuredUrl =
    (post.featured_media ? media.byId(post.featured_media)?.source_url : undefined) ||
    post.jetpack_featured_media_url;
  const featuredImage = featuredUrl
    ? await media.ensure({
        legacyUrl: featuredUrl,
        baseName: `insight-${post.slug}`,
        altText: `${FALLBACK_ALT_PREFIX} ${title}`,
      })
    : null;
  if (!featuredUrl) report.warnings.push(`${post.slug} has no featured image`);

  const seo = await fetchPageSeo(`/${post.slug}/`);
  const data = {
    slug: post.slug,
    title,
    excerpt: htmlToPlainText(post.excerpt.rendered).replace(EXCERPT_ELLIPSIS, ''),
    faq: extractFaq(post.content.rendered),
    body: toDocument(blocks),
    searchText: text,
    readingMinutes: readingMinutes(text),
    legacyWordpressId: post.id,
    legalReviewStatus: 'approved' as const,
    status: 'published' as const,
    publishedAt: publishedAt(post.date_gmt),
    ...seo,
    featuredImageId: featuredImage?.id ?? null,
  };
  const row = await syncRecord(report, 'insight', data, {
    find: () => db.insight.findUnique({ where: { legacyWordpressId: post.id } }),
    create: (values) => db.insight.create({ data: values }),
    update: (existing, values) => db.insight.update({ where: { id: existing.id }, data: values }),
  });
  await claimSlug(db, { slug: post.slug, type: 'insight', entityId: row.id });

  const categorySlugs = categorySlugsFor(post, lookups.categorySlugById);
  if (categorySlugs.length === 0) report.warnings.push(`${post.slug} has no category`);
  const categoryIds = categorySlugs.flatMap((slug) => lookups.categoryIds.get(slug) ?? []);
  const practiceAreaIds = [
    ...new Set(
      categorySlugs.flatMap((slug) => {
        const practice = CATEGORY_PRACTICE_AREAS[slug];
        return practice ? (lookups.practiceIds.get(practice) ?? []) : [];
      }),
    ),
  ];
  const authorIds = detectAuthorSlugs(text).flatMap((slug) => lookups.teamIds.get(slug) ?? []);

  const current = await db.insight.findUniqueOrThrow({
    where: { id: row.id },
    select: {
      categories: { select: { id: true } },
      practiceAreas: { select: { id: true } },
      authors: { select: { id: true } },
    },
  });
  const linksMatch =
    sameIds(current.categories, categoryIds) &&
    sameIds(current.practiceAreas, practiceAreaIds) &&
    sameIds(current.authors, authorIds);
  if (!linksMatch) {
    report.record('insight links', 'updated');
    await db.insight.update({
      where: { id: row.id },
      data: {
        categories: { set: categoryIds.map((id) => ({ id })) },
        practiceAreas: { set: practiceAreaIds.map((id) => ({ id })) },
        authors: { set: authorIds.map((id) => ({ id })) },
      },
    });
  }
}

export async function importInsights(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  posts: readonly WpPost[],
  categories: readonly WpCategory[],
  droppedSlugs: ReadonlySet<string>,
  lookups: Omit<InsightLookups, 'categorySlugById'>,
): Promise<void> {
  const categorySlugById = new Map(categories.map(({ id, slug }) => [id, slug]));
  for (const post of posts) {
    if (droppedSlugs.has(post.slug)) {
      report.skipped.push(`Post dropped under decision 0004, redirect recorded: /${post.slug}/`);
      continue;
    }
    await importInsight(db, report, media, post, { ...lookups, categorySlugById });
  }
}
