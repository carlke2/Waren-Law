import { load } from 'cheerio';
import type { FaqItem } from '@waren/shared';
import { claimSlug } from '../../../../src/database/slug-registry.js';
import { resolveImages, toDocument } from '../blocks.js';
import {
  COMMON_SKIPPED_WIDGETS,
  WEBINARS,
  WEBINAR_AUDIENCE_HEADING,
  WEBINAR_DROP_BLOCKS,
  WEBINAR_SUMMARY_HEADING,
} from '../curation.js';
import type { Database } from '../database.js';
import {
  blockText,
  htmlToBlocks,
  htmlToPlainText,
  normaliseText,
  type ParsedBlock,
} from '../html-to-blocks.js';
import type { MediaLibrary } from '../media.js';
import { fetchPageSeo } from '../seo.js';
import { ImportReport, sameIds, syncRecord } from '../sync.js';
import type { WpPage } from '../wp-client.js';
import { assertNoBannedClaims, publishedAt } from './shared.js';

function extractToggleFaq(html: string): FaqItem[] {
  const $ = load(html, null, false);
  const clean = (value: string) => normaliseText(value).trim();
  return $('.elementor-toggle-item')
    .toArray()
    .map((item) => ({
      question: clean($(item).find('.elementor-tab-title').text()),
      answer: clean($(item).find('.elementor-tab-content').text()),
    }))
    .filter(({ question, answer }) => question && answer);
}

// The summary is shown in the page hero, so the body doesn't repeat it. The audience section's
// sub-headings become cards, which the source page nests one level too deep.
export function reshapeWebinarBody(
  blocks: readonly ParsedBlock[],
  summaryIndex: number,
  audienceIndex: number,
): ParsedBlock[] {
  const next = summaryIndex === -1 ? undefined : blocks[summaryIndex + 2];
  const summaryHasMore = next !== undefined && next.type !== 'heading';
  return blocks.flatMap((block, index): ParsedBlock[] => {
    if (index === summaryIndex + 1 && summaryIndex !== -1) return [];
    if (index === summaryIndex && !summaryHasMore) return [];
    if (audienceIndex === -1 || index <= audienceIndex || block.type !== 'heading') return [block];
    if (index === audienceIndex + 1) return [{ type: 'paragraph', content: block.content }];
    return block.level === 4 ? [{ ...block, level: 3 }] : [block];
  });
}

export async function importWebinars(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  pages: readonly WpPage[],
  teamIds: ReadonlyMap<string, string>,
  normaliseHref: (href: string) => string,
): Promise<void> {
  for (const entry of WEBINARS) {
    const page = pages.find(({ slug }) => slug === entry.slug);
    if (!page) throw new Error(`Missing WordPress page ${entry.slug}`);
    const title = htmlToPlainText(page.title.rendered).replace(/\s+Webinar$/i, '');
    const parsed = htmlToBlocks(page.content.rendered, {
      skipWidgets: COMMON_SKIPPED_WIDGETS,
      normaliseHref,
    }).filter((block) => {
      const text = blockText(block);
      return !WEBINAR_DROP_BLOCKS.test(text) && text.toLowerCase() !== title.toLowerCase();
    });
    const summaryIndex = parsed.findIndex((block) =>
      WEBINAR_SUMMARY_HEADING.test(blockText(block)),
    );
    const audienceIndex = parsed.findIndex((block) =>
      WEBINAR_AUDIENCE_HEADING.test(blockText(block)),
    );
    const summaryBlock = summaryIndex === -1 ? undefined : parsed[summaryIndex + 1];
    const audienceBlock = audienceIndex === -1 ? undefined : parsed[audienceIndex + 1];

    const blocks = await resolveImages(
      reshapeWebinarBody(parsed, summaryIndex, audienceIndex),
      media,
      `webinar-${entry.slug}`,
      title,
    );
    assertNoBannedClaims(blocks, entry.slug);

    const hero = entry.heroImage
      ? await media.ensure({
          legacyUrl: media.uploadUrl(entry.heroImage),
          baseName: `webinar-${entry.slug}`,
          altText: `${title} webinar banner`,
        })
      : null;
    const seo = await fetchPageSeo(`/${page.slug}/`);

    const data = {
      slug: entry.slug,
      title,
      summary: summaryBlock ? blockText(summaryBlock) : '',
      body: toDocument(blocks),
      startsAt: entry.startsAt ? new Date(entry.startsAt) : null,
      timezone: entry.timezone,
      state: entry.state,
      registrationUrl: null,
      recordingUrl: null,
      recordingGated: entry.recordingGated,
      faq: extractToggleFaq(page.content.rendered),
      audience: audienceBlock ? blockText(audienceBlock) : null,
      legalReviewStatus: 'approved' as const,
      legacyWordpressId: page.id,
      status: 'published' as const,
      publishedAt: publishedAt(page.date_gmt),
      ...seo,
      heroImageId: hero?.id ?? null,
    };
    const row = await syncRecord(report, 'webinar', data, {
      find: () => db.webinar.findUnique({ where: { slug: entry.slug } }),
      create: (values) => db.webinar.create({ data: values }),
      update: (existing, values) => db.webinar.update({ where: { id: existing.id }, data: values }),
    });
    await claimSlug(db, { slug: entry.slug, type: 'webinar', entityId: row.id });

    const panelIds = entry.panel.flatMap((slug) => teamIds.get(slug) ?? []);
    const current = await db.webinar.findUniqueOrThrow({
      where: { id: row.id },
      select: { panel: { select: { id: true } } },
    });
    if (!sameIds(current.panel, panelIds)) {
      report.record('webinar panel links', 'updated');
      await db.webinar.update({
        where: { id: row.id },
        data: { panel: { set: panelIds.map((id) => ({ id })) } },
      });
    }
  }
  report.fixes.add('The past Trusts & Taxes webinar no longer asks people to register');
}
