import {
  CATEGORIES_NOT_IMPORTED,
  CATEGORY_ORDER,
  DATA_PROTECTION_CATEGORY,
  MERGED_CATEGORIES,
  OFFICES,
} from '../curation.js';
import type { Database } from '../database.js';
import { htmlToPlainText } from '../html-to-blocks.js';
import { ImportReport, syncRecord } from '../sync.js';
import type { WpCategory } from '../wp-client.js';

export async function importCategories(
  db: Database,
  report: ImportReport,
  wordpressCategories: readonly WpCategory[],
): Promise<Map<string, string>> {
  const kept = wordpressCategories.filter(
    ({ slug }) => !(slug in MERGED_CATEGORIES) && !CATEGORIES_NOT_IMPORTED.includes(slug),
  );
  const entries = [
    ...kept.map(({ slug, name }) => ({ slug, name: htmlToPlainText(name) })),
    DATA_PROTECTION_CATEGORY,
  ];
  const ids = new Map<string, string>();
  for (const entry of entries) {
    const data = {
      ...entry,
      sortOrder: CATEGORY_ORDER.indexOf(entry.slug),
      status: 'published' as const,
    };
    const row = await syncRecord(report, 'category', data, {
      find: () => db.category.findUnique({ where: { slug: entry.slug } }),
      create: (values) => db.category.create({ data: values }),
      update: (existing, values) =>
        db.category.update({ where: { id: existing.id }, data: values }),
    });
    ids.set(entry.slug, row.id);
  }
  return ids;
}

export async function importOffices(
  db: Database,
  report: ImportReport,
  partnerIds: ReadonlyMap<string, string>,
): Promise<Map<string, string>> {
  const ids = new Map<string, string>();
  for (const [sortOrder, office] of OFFICES.entries()) {
    const data = {
      slug: office.slug,
      name: office.name,
      type: office.type,
      addressLine: office.addressLine,
      building: office.building ?? null,
      city: office.city,
      country: office.country,
      poBox: office.poBox ?? null,
      mapEmbedUrl: office.mapEmbedUrl ?? null,
      sortOrder,
      status: 'published' as const,
      partnerId: office.partnerSlug ? (partnerIds.get(office.partnerSlug) ?? null) : null,
    };
    const row = await syncRecord(report, 'office', data, {
      find: () => db.office.findUnique({ where: { slug: office.slug } }),
      create: (values) => db.office.create({ data: values }),
      update: (existing, values) => db.office.update({ where: { id: existing.id }, data: values }),
    });
    ids.set(office.slug, row.id);
  }
  return ids;
}
