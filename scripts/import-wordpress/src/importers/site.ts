import { load } from 'cheerio';
import { readFile } from 'node:fs/promises';
import { parse } from 'csv-parse/sync';
import { claimSlug } from '../../../../backend/src/database/slug-registry.js';
import type { Prisma } from '../../../../backend/prisma/generated/client.js';
import { resolveImages, toDocument } from '../blocks.js';
import { config } from '../config.js';
import {
  AWARD,
  CLIENT_LOGOS,
  COMMON_SKIPPED_WIDGETS,
  PAGES,
  PARTNERS,
  PARTNERS_PAGE_SLUG,
  SETTING_MEDIA,
  SETTINGS,
  type PageEntry,
} from '../curation.js';
import type { Database } from '../database.js';
import { blockText, htmlToBlocks, type ParsedBlock } from '../html-to-blocks.js';
import { toKebabCase, type MediaLibrary } from '../media.js';
import { fetchPageSeo } from '../seo.js';
import { ImportReport, sameIds, syncRecord } from '../sync.js';
import type { WpPage } from '../wp-client.js';
import { applyTextFixes, assertNoBannedClaims, cutAtCallToAction, publishedAt } from './shared.js';

const REDACTED_MARKER = '[slug-redacted]';
const DROPPED_DECISION = 'drop';
const POST_TYPE = 'post';
const PAGINATION_TYPE = 'other (pagination)';

interface InventoryRow {
  url: string;
  type: string;
  keep_rewrite_drop: string;
  proposed_new_url: string;
}

async function readInventory(): Promise<InventoryRow[]> {
  const csv = await readFile(config.urlInventoryPath, 'utf8');
  return parse(csv, { columns: true, skip_empty_lines: true }) as InventoryRow[];
}

export async function droppedPostSlugs(): Promise<Set<string>> {
  const rows = await readInventory();
  return new Set(
    rows
      .filter(({ type, keep_rewrite_drop }) => {
        return type === POST_TYPE && keep_rewrite_drop === DROPPED_DECISION;
      })
      .map(({ url }) => url.replaceAll('/', '')),
  );
}

async function wordpressPageBlocks(
  entry: PageEntry,
  page: WpPage,
  normaliseHref: (href: string) => string,
): Promise<ParsedBlock[]> {
  const kept = cutAtCallToAction(
    htmlToBlocks(page.content.rendered, {
      skipWidgets: COMMON_SKIPPED_WIDGETS,
      normaliseHref,
    }),
  ).filter((block: ParsedBlock) => {
    const text = blockText(block);
    if (entry.keepOnly) return entry.keepOnly.test(text);
    return !entry.dropBlocks?.test(text);
  });
  return kept;
}

export async function importPages(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  pages: readonly WpPage[],
  normaliseHref: (href: string) => string,
): Promise<void> {
  for (const entry of PAGES) {
    const page = pages.find(({ slug }) => slug === entry.wordpressSlug);
    if (!page && !entry.authored) throw new Error(`Missing WordPress page ${entry.slug}`);
    const parsed = page
      ? await wordpressPageBlocks(entry, page, normaliseHref)
      : (entry.authored?.blocks ?? []);
    const fixed = applyTextFixes(parsed, report);
    const blocks = await resolveImages(
      entry.reshape ? entry.reshape(fixed) : fixed,
      media,
      `page-${entry.slug}`,
      entry.title,
    );
    assertNoBannedClaims(blocks, entry.slug);
    const seo = page
      ? await fetchPageSeo(entry.path)
      : { metaTitle: entry.title, metaDescription: entry.authored?.metaDescription ?? null };
    const data = {
      slug: entry.slug,
      title: entry.title,
      body: toDocument(blocks),
      template: entry.template,
      // New wording stays unapproved until the firm's advocate reviews it (decision 0005).
      legalReviewStatus: page ? ('approved' as const) : ('needs_advocate_review' as const),
      legacyWordpressId: page?.id ?? null,
      status: 'published' as const,
      publishedAt: page ? publishedAt(page.date_gmt) : null,
      canonicalUrl: null,
      ...seo,
    };
    const row = await syncRecord(report, 'page', data, {
      find: () => db.page.findUnique({ where: { slug: entry.slug } }),
      create: (values) => db.page.create({ data: values }),
      update: (existing, values) => db.page.update({ where: { id: existing.id }, data: values }),
    });
    await claimSlug(db, { slug: entry.slug, type: 'page', entityId: row.id });
  }
  report.fixes.add('About Us no longer declares the corporate practice page as its canonical URL');
}

function paragraphAfterHeading(blocks: readonly ParsedBlock[], heading: string): string {
  const index = blocks.findIndex(
    (block) => block.type === 'heading' && blockText(block).toLowerCase() === heading.toLowerCase(),
  );
  const next = index === -1 ? undefined : blocks[index + 1];
  if (next?.type !== 'paragraph') throw new Error(`No description after heading "${heading}"`);
  return blockText(next);
}

function carouselImages(html: string): string[][] {
  const $ = load(html, null, false);
  return $('[data-widget_type^="image-carousel"]')
    .toArray()
    .map((widget) =>
      $(widget)
        .find('.swiper-slide:not(.swiper-slide-duplicate) img')
        .toArray()
        .flatMap((image) => image.attribs.src ?? []),
    );
}

export async function importPartners(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  pages: readonly WpPage[],
): Promise<Map<string, string>> {
  const page = pages.find(({ slug }) => slug === PARTNERS_PAGE_SLUG);
  if (!page) throw new Error(`Missing WordPress page ${PARTNERS_PAGE_SLUG}`);
  const blocks = applyTextFixes(
    htmlToBlocks(page.content.rendered, { skipWidgets: COMMON_SKIPPED_WIDGETS }),
    report,
  );
  const carousels = carouselImages(page.content.rendered);
  const ids = new Map<string, string>();

  for (const [sortOrder, partner] of PARTNERS.entries()) {
    const data = {
      slug: partner.slug,
      name: partner.name,
      description: paragraphAfterHeading(blocks, partner.heading),
      websiteUrl: partner.websiteUrl,
      sortOrder,
      status: 'published' as const,
    };
    const row = await syncRecord(report, 'partner', data, {
      find: () => db.partner.findUnique({ where: { slug: partner.slug } }),
      create: (values) => db.partner.create({ data: values }),
      update: (existing, values) => db.partner.update({ where: { id: existing.id }, data: values }),
    });
    ids.set(partner.slug, row.id);

    const gallery = [];
    for (const [index, src] of (carousels[partner.carouselIndex] ?? []).entries()) {
      gallery.push(
        await media.ensure({
          legacyUrl: src,
          baseName: `partner-signing-${partner.carouselIndex + 1}-${index + 1}`,
          altText: `Signing ceremony with ${partner.name}, Beijing`,
        }),
      );
    }
    const galleryIds = gallery.map(({ id }) => id);
    const current = await db.partner.findUniqueOrThrow({
      where: { id: row.id },
      select: { gallery: { select: { id: true } } },
    });
    if (!sameIds(current.gallery, galleryIds)) {
      report.record('partner gallery links', 'updated');
      await db.partner.update({
        where: { id: row.id },
        data: { gallery: { set: galleryIds.map((id) => ({ id })) } },
      });
    }
  }
  return ids;
}

export async function importSettings(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
): Promise<void> {
  for (const [key, value] of Object.entries(SETTINGS)) {
    const curatedMedia = SETTING_MEDIA[key];
    const record = curatedMedia
      ? await media.ensure({
          legacyUrl: media.uploadUrl(curatedMedia.file),
          baseName: curatedMedia.baseName,
          altText: curatedMedia.altText,
        })
      : null;
    const data = { value: value as Prisma.InputJsonValue, mediaId: record?.id ?? null };
    await syncRecord(report, 'setting', data, {
      find: () => db.setting.findUnique({ where: { key } }),
      create: (values) => db.setting.create({ data: { key, ...values } }),
      update: (existing, values) =>
        db.setting.update({ where: { key: existing.key }, data: values }),
    });
  }
}

export async function importAward(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
): Promise<void> {
  const image = await media.ensure({
    legacyUrl: media.uploadUrl(AWARD.image),
    baseName: `award-${AWARD.slug}`,
    altText: AWARD.imageAlt,
  });
  const data = {
    slug: AWARD.slug,
    name: AWARD.name,
    awarder: AWARD.awarder,
    year: AWARD.year,
    category: AWARD.category,
    visible: true,
    status: 'published' as const,
    imageId: image.id,
  };
  await syncRecord(report, 'award', data, {
    find: () => db.award.findUnique({ where: { slug: AWARD.slug } }),
    create: (values) => db.award.create({ data: values }),
    update: (existing, values) => db.award.update({ where: { id: existing.id }, data: values }),
  });
}

export async function importClientLogos(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
): Promise<void> {
  for (const [sortOrder, logo] of CLIENT_LOGOS.entries()) {
    const slug = toKebabCase(logo.name);
    const image = await media.ensure({
      legacyUrl: media.uploadUrl(logo.file),
      baseName: `client-logo-${slug}`,
      altText: `${logo.name} logo`,
    });
    const data = {
      slug,
      name: logo.name,
      altText: `${logo.name} logo`,
      permissionConfirmed: false,
      sortOrder,
      visible: false,
      status: 'published' as const,
      logoId: image.id,
    };
    await syncRecord(report, 'client logo', data, {
      find: () => db.clientLogo.findUnique({ where: { slug } }),
      create: (values) => db.clientLogo.create({ data: values }),
      update: (existing, values) =>
        db.clientLogo.update({ where: { id: existing.id }, data: values }),
    });
  }
}

export async function importRedirects(db: Database, report: ImportReport): Promise<void> {
  for (const row of await readInventory()) {
    const toPath = row.proposed_new_url.trim();
    if (toPath === row.url.trim() || !toPath) continue;
    if (row.url.includes(REDACTED_MARKER)) {
      report.skipped.push(`Redirect handled by a frontend pattern rule: ${row.url}`);
      continue;
    }
    if (row.url.startsWith('/?') || row.type === PAGINATION_TYPE) {
      report.skipped.push(`Redirect handled by a frontend pattern rule: ${row.url}`);
      continue;
    }
    const data = { fromPath: row.url, toPath, statusCode: 301, note: row.keep_rewrite_drop };
    await syncRecord(report, 'redirect', data, {
      find: () => db.redirect.findUnique({ where: { fromPath: row.url } }),
      create: (values) => db.redirect.create({ data: values }),
      update: (existing, values) =>
        db.redirect.update({ where: { id: existing.id }, data: values }),
    });
  }
}
