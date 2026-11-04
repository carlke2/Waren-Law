import { readdir } from 'node:fs/promises';
import { createHrefNormaliser } from './blocks.js';
import { config } from './config.js';
import { EXPECTED_COUNTS, IMPORT_NOTES, STATIC_FIXES } from './curation.js';
import { createDatabase } from './database.js';
import { importInsights } from './importers/insights.js';
import { importPracticeAreas } from './importers/practice-areas.js';
import {
  droppedPostSlugs,
  importAward,
  importClientLogos,
  importHome,
  importPages,
  importPartners,
  importRedirects,
  importSettings,
} from './importers/site.js';
import { importTeam } from './importers/team.js';
import { importCategories, importOffices } from './importers/taxonomy.js';
import { importWebinars } from './importers/webinars.js';
import { MediaLibrary } from './media.js';
import { ImportReport } from './sync.js';
import { fetchWordPressContent, networkRequestCount } from './wp-client.js';

function printSection(title: string, lines: readonly string[]): void {
  console.log(`\n${title} (${lines.length})`);
  lines.forEach((line) => console.log(`  - ${line}`));
}

async function printSummary(report: ImportReport): Promise<void> {
  console.log('\nEntity                  total  created  updated  unchanged');
  for (const [name, c] of [...report.counts.entries()].sort()) {
    const total = c.created + c.updated + c.unchanged;
    console.log(
      `${name.padEnd(24)}${String(total).padStart(5)}${String(c.created).padStart(9)}${String(c.updated).padStart(9)}${String(c.unchanged).padStart(11)}`,
    );
  }
  const files = await readdir(config.uploadsDir).catch(() => []);
  console.log(`\nMedia files on disk: ${files.filter((f) => f.endsWith('.webp')).length}`);
  console.log(`Network requests this run: ${networkRequestCount()}`);
  console.log(`Records changed this run: ${report.changes}`);
  printSection('Data fixes', [...STATIC_FIXES, ...report.fixes]);
  printSection('Skipped', report.skipped);
  printSection('Notes for review', IMPORT_NOTES);
  printSection('Warnings', report.warnings);
}

function checkExpectedCounts(report: ImportReport): void {
  for (const [entity, expected] of Object.entries(EXPECTED_COUNTS)) {
    const actual = report.total(entity);
    if (actual !== expected) report.warnings.push(`${entity}: expected ${expected}, got ${actual}`);
  }
}

async function main(): Promise<void> {
  const db = createDatabase();
  const report = new ImportReport();
  try {
    const wordpress = await fetchWordPressContent();
    const media = new MediaLibrary(db, report, wordpress.media);
    const normaliseHref = createHrefNormaliser(report);

    const categoryIds = await importCategories(db, report, wordpress.categories);
    const partnerIds = await importPartners(db, report, media, wordpress.pages);
    const officeIds = await importOffices(db, report, partnerIds);
    const practiceIds = await importPracticeAreas(
      db,
      report,
      media,
      wordpress.pages,
      categoryIds,
      normaliseHref,
    );
    const teamIds = await importTeam(
      db,
      report,
      media,
      wordpress.pages,
      officeIds,
      practiceIds,
      normaliseHref,
    );
    await importInsights(
      db,
      report,
      media,
      wordpress.posts,
      wordpress.categories,
      await droppedPostSlugs(),
      {
        categoryIds,
        practiceIds,
        teamIds,
        normaliseHref,
      },
    );
    await importWebinars(db, report, media, wordpress.pages, teamIds, normaliseHref);
    await importPages(db, report, media, wordpress.pages, normaliseHref);
    await importHome(db, report, media);
    await importSettings(db, report, media);
    await importAward(db, report, media);
    await importClientLogos(db, report, media);
    await importRedirects(db, report);

    checkExpectedCounts(report);
    await printSummary(report);
  } finally {
    await db.$disconnect();
  }
}

await main();
