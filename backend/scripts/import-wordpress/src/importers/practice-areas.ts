import { load } from 'cheerio';
import type { FaqItem } from '@waren/shared';
import { claimSlug } from '../../../../src/database/slug-registry.js';
import { resolveImages, toDocument } from '../blocks.js';
import {
  COMMON_SKIPPED_WIDGETS,
  DEBT_MERGE,
  PRACTICE_AREAS,
  SHORT_SUMMARY_MAX_LENGTH,
  type PracticeAreaEntry,
} from '../curation.js';
import type { Database } from '../database.js';
import {
  blocksToPlainText,
  blockText,
  htmlToBlocks,
  normaliseText,
  type ConvertOptions,
  type ParsedBlock,
} from '../html-to-blocks.js';
import type { MediaLibrary } from '../media.js';
import { fetchPageSeo } from '../seo.js';
import { ImportReport, syncRecord } from '../sync.js';
import type { WpPage } from '../wp-client.js';
import { applyTextFixes, assertNoBannedClaims, cutAtCallToAction, publishedAt } from './shared.js';

const BANNER_TEXT = /^Experience what We Do Best/i;

function summarise(blocks: readonly ParsedBlock[]): string {
  const first = blocks.find((block) => block.type === 'paragraph');
  const text = first ? blockText(first) : '';
  if (text.length <= SHORT_SUMMARY_MAX_LENGTH) return text;
  const sentence = text.match(/^.+?[.!?](?=\s)/)?.[0];
  return sentence && sentence.length <= SHORT_SUMMARY_MAX_LENGTH
    ? sentence
    : `${text.slice(0, SHORT_SUMMARY_MAX_LENGTH).trimEnd()}…`;
}

function practiceBlocks(page: WpPage, name: string, options: ConvertOptions): ParsedBlock[] {
  const headings = new Set([name.toLowerCase(), normaliseText(page.title.rendered).toLowerCase()]);
  return cutAtCallToAction(htmlToBlocks(page.content.rendered, options)).filter((block) => {
    const text = blockText(block);
    return (
      !BANNER_TEXT.test(text) && !(block.type === 'heading' && headings.has(text.toLowerCase()))
    );
  });
}

function mergedDebtContent(
  longPage: WpPage,
  shortPage: WpPage,
  name: string,
  options: ConvertOptions,
): { blocks: ParsedBlock[]; faq: FaqItem[] } {
  const $ = load(longPage.content.rendered, null, false);
  const clean = (value: string) => normaliseText(value).trim();

  const services = $('.wl-svc-item')
    .toArray()
    .flatMap((item): ParsedBlock[] => [
      {
        type: 'heading',
        level: 3,
        content: [{ text: clean($(item).find('.wl-svc-title').text()) }],
      },
      { type: 'paragraph', content: [{ text: clean($(item).find('.wl-svc-body').text()) }] },
    ]);

  const faq = $('.wl-faq-item')
    .toArray()
    .map((item) => ({
      question: clean($(item).find('.wl-faq-q-text').text()),
      answer: DEBT_MERGE.droppedFaqSentences
        .reduce(
          (answer, sentence) => answer.replace(sentence, ''),
          clean($(item).find('.wl-faq-ans').text()),
        )
        .trim(),
    }))
    .filter(({ question }) => DEBT_MERGE.keptFaqQuestions.includes(question));

  return {
    blocks: [
      ...practiceBlocks(shortPage, name, options),
      { type: 'heading', level: 2, content: [{ text: DEBT_MERGE.servicesHeading }] },
      ...services,
    ],
    faq,
  };
}

async function importPracticeArea(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  entry: PracticeAreaEntry,
  sortOrder: number,
  page: WpPage,
  pagesBySlug: ReadonlyMap<string, WpPage>,
  categoryIds: ReadonlyMap<string, string>,
  options: ConvertOptions,
): Promise<string> {
  const isDebt = entry.slug === PRACTICE_AREAS[0]?.slug;
  const shortPage = pagesBySlug.get(DEBT_MERGE.shortPageSlug);
  if (isDebt && !shortPage) throw new Error(`Missing page ${DEBT_MERGE.shortPageSlug}`);
  const { blocks: parsed, faq } =
    isDebt && shortPage
      ? mergedDebtContent(page, shortPage, entry.name, options)
      : { blocks: practiceBlocks(page, entry.name, options), faq: [] };

  const fixed = applyTextFixes(parsed, report);
  const blocks = await resolveImages(fixed, media, `practice-${entry.slug}`, entry.name);
  assertNoBannedClaims(blocks, entry.slug);
  const seo = await fetchPageSeo(`/${page.slug}/`);
  assertNoBannedClaims(`${seo.metaTitle} ${seo.metaDescription}`, `${entry.slug} metadata`);

  const data = {
    slug: entry.slug,
    name: entry.name,
    shortSummary: summarise(fixed),
    icon: entry.icon,
    cardTitle: entry.cardTitle,
    shortName: entry.shortName,
    cardSummary: entry.cardSummary,
    body: toDocument(blocks),
    faq,
    searchText: blocksToPlainText(blocks),
    sortOrder,
    legalReviewStatus: 'approved' as const,
    legacyWordpressId: page.id,
    status: 'published' as const,
    publishedAt: publishedAt(page.date_gmt),
    ...seo,
    categoryId: entry.categorySlug ? (categoryIds.get(entry.categorySlug) ?? null) : null,
  };
  const row = await syncRecord(report, 'practice area', data, {
    find: () => db.practiceArea.findUnique({ where: { slug: entry.slug } }),
    create: (values) => db.practiceArea.create({ data: values }),
    update: (existing, values) =>
      db.practiceArea.update({ where: { id: existing.id }, data: values }),
  });
  await claimSlug(db, { slug: entry.slug, type: 'practice_area', entityId: row.id });
  return row.id;
}

export async function importPracticeAreas(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  pages: readonly WpPage[],
  categoryIds: ReadonlyMap<string, string>,
  normaliseHref: (href: string) => string,
): Promise<Map<string, string>> {
  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));
  const options = { skipWidgets: COMMON_SKIPPED_WIDGETS, normaliseHref };
  const ids = new Map<string, string>();
  for (const [sortOrder, entry] of PRACTICE_AREAS.entries()) {
    const page = pagesBySlug.get(entry.slug);
    if (!page) throw new Error(`Missing WordPress page ${entry.slug}`);
    ids.set(
      entry.slug,
      await importPracticeArea(
        db,
        report,
        media,
        entry,
        sortOrder,
        page,
        pagesBySlug,
        categoryIds,
        options,
      ),
    );
  }
  report.fixes.add(
    'Merged the two debt pages into corporate-debt-recovery, leaving out testimonials, statistics and unverified claims',
  );
  return ids;
}
