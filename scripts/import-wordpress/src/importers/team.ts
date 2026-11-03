import { load } from 'cheerio';
import type { Block } from '@waren/shared';
import { resolveImages, toDocument } from '../blocks.js';
import { COMMON_SKIPPED_WIDGETS, PROFILE_MEMBER_TYPES, TEAM, type TeamEntry } from '../curation.js';
import type { Database } from '../database.js';
import {
  blocksToPlainText,
  blockText,
  htmlToBlocks,
  normaliseText,
  type ParsedBlock,
} from '../html-to-blocks.js';
import { inlineText } from '../html-to-blocks.js';
import { toKebabCase, type MediaLibrary } from '../media.js';
import { ImportReport, sameIds, syncRecord } from '../sync.js';
import type { WpPage } from '../wp-client.js';
import { fetchPageSeo } from '../seo.js';
import { applyTextFixes, assertNoBannedClaims, fixText } from './shared.js';

const TEAM_PAGE_SLUG = 'our-team';
const PROFILE_LANGUAGES_DEFAULT: string[] = [];

interface TeamCard {
  name: string;
  roleTitle: string;
  shortBio: string;
  portraitUrl: string;
}

interface ProfileContent {
  longBio: ParsedBlock[];
  experience: string[] | null;
  education: string[] | null;
  admissions: string[] | null;
  memberships: string[] | null;
  languages: string[];
}

function parseTeamCards(html: string): Map<string, TeamCard> {
  const $ = load(html, null, false);
  const clean = (value: string) => normaliseText(value).trim();
  const cards = new Map<string, TeamCard>();
  $('[data-widget_type^="eael-flip-box"]').each((_, widget) => {
    const card = $(widget);
    const name = clean(card.find('h4, h5').first().text());
    cards.set(name, {
      name,
      roleTitle: clean(card.find('p').first().text()),
      shortBio: clean(card.find('h6').first().text()),
      portraitUrl: card.find('img').first().attr('src') ?? '',
    });
  });
  return cards;
}

function listAfter(blocks: readonly ParsedBlock[], index: number): string[] | null {
  const next = blocks[index + 1];
  return next?.type === 'list' ? next.items.map(inlineText) : null;
}

function findIndex(blocks: readonly ParsedBlock[], pattern: RegExp): number {
  return blocks.findIndex((block) => pattern.test(blockText(block)));
}

function listFollowing(blocks: readonly ParsedBlock[], pattern: RegExp): string[] | null {
  const index = findIndex(blocks, pattern);
  return index === -1 ? null : listAfter(blocks, index);
}

function parseProfile(page: WpPage, normaliseHref: (href: string) => string): ProfileContent {
  const blocks = htmlToBlocks(page.content.rendered, {
    skipWidgets: COMMON_SKIPPED_WIDGETS,
    normaliseHref,
  });
  const contactIndex = blocks.findIndex(
    (block) => block.type === 'list' && /Email:/.test(blockText(block)),
  );
  const bioEnd = blocks.findIndex((block, index) => {
    return (
      index > contactIndex &&
      /^(Representative experience|Recognition|Kind Words|Credentials|RECENT POSTS)/i.test(
        blockText(block),
      )
    );
  });
  return {
    longBio: blocks.slice(contactIndex + 1, bioEnd === -1 ? undefined : bioEnd),
    experience: listFollowing(blocks, /^Representative experience/i),
    admissions: listFollowing(blocks, /^Admissions:/i),
    education: listFollowing(blocks, /^Education:/i),
    memberships: listFollowing(blocks, /^Professional memberships:/i),
    languages: listFollowing(blocks, /^Languages:/i) ?? PROFILE_LANGUAGES_DEFAULT,
  };
}

async function ensurePortrait(media: MediaLibrary, entry: TeamEntry, card: TeamCard, slug: string) {
  const legacyUrl = entry.portrait ? media.uploadUrl(entry.portrait) : card.portraitUrl;
  return media.ensure({
    legacyUrl,
    baseName: `team-${slug}`,
    altText: `Portrait of ${entry.name}, ${card.roleTitle}, WAREN Law Advocates LLP`,
  });
}

async function importMember(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  entry: TeamEntry,
  sortOrder: number,
  card: TeamCard,
  pagesBySlug: ReadonlyMap<string, WpPage>,
  officeIds: ReadonlyMap<string, string>,
  practiceIds: ReadonlyMap<string, string>,
  normaliseHref: (href: string) => string,
): Promise<string> {
  const slug = toKebabCase(entry.name);
  const portrait = await ensurePortrait(media, entry, card, slug);
  const profilePage = entry.profilePageSlug ? pagesBySlug.get(entry.profilePageSlug) : undefined;
  if (entry.profilePageSlug && !profilePage) {
    throw new Error(`Missing profile page ${entry.profilePageSlug}`);
  }
  const profile = profilePage ? parseProfile(profilePage, normaliseHref) : null;
  const longBioBlocks: Block[] | null = profile
    ? await resolveImages(
        applyTextFixes(profile.longBio, report),
        media,
        `team-${slug}-bio`,
        entry.name,
      )
    : null;
  const seo = profilePage
    ? await fetchPageSeo(`/our-team/${profilePage.slug}/`)
    : { metaTitle: null, metaDescription: null };

  const experience = profile?.experience?.map((item) => fixText(item, report));
  assertNoBannedClaims(
    [experience?.join(' ') ?? '', longBioBlocks ? blocksToPlainText(longBioBlocks) : ''].join(' '),
    slug,
  );

  const data = {
    slug,
    fullName: entry.name,
    roleTitle: entry.roleTitle ?? card.roleTitle,
    memberType: entry.memberType,
    isAdvocate: entry.isAdvocate,
    shortBio: card.shortBio,
    longBio: longBioBlocks ? toDocument(longBioBlocks) : undefined,
    experience: experience ?? undefined,
    education: profile?.education ?? undefined,
    admissions: profile?.admissions ?? undefined,
    memberships: profile?.memberships ?? undefined,
    languages: profile?.languages ?? [],
    email: entry.email ?? null,
    phone: entry.phone ?? null,
    whatsApp: entry.whatsApp ?? null,
    linkedInUrl: entry.linkedInUrl ?? null,
    bookingUrl: entry.bookingUrl ?? null,
    hasProfile: PROFILE_MEMBER_TYPES.includes(entry.memberType),
    searchText: [
      entry.name,
      entry.roleTitle ?? card.roleTitle,
      card.shortBio,
      longBioBlocks ? blocksToPlainText(longBioBlocks) : '',
    ]
      .filter(Boolean)
      .join('\n'),
    sortOrder,
    status: 'published' as const,
    publishedAt: profilePage ? new Date(`${profilePage.date_gmt}Z`) : null,
    ...seo,
    portraitId: portrait.id,
    officeId: entry.officeSlug ? (officeIds.get(entry.officeSlug) ?? null) : null,
  };

  const row = await syncRecord(report, 'team member', data, {
    find: () => db.teamMember.findUnique({ where: { slug } }),
    create: (values) => db.teamMember.create({ data: values }),
    update: (existing, values) =>
      db.teamMember.update({ where: { id: existing.id }, data: values }),
  });

  const desired = entry.practiceAreas.flatMap((areaSlug) => practiceIds.get(areaSlug) ?? []);
  const current = await db.teamMember.findUniqueOrThrow({
    where: { id: row.id },
    select: { practiceAreas: { select: { id: true } } },
  });
  if (!sameIds(current.practiceAreas, desired)) {
    report.record('team practice links', 'updated');
    await db.teamMember.update({
      where: { id: row.id },
      data: { practiceAreas: { set: desired.map((id) => ({ id })) } },
    });
  }
  return row.id;
}

export async function importTeam(
  db: Database,
  report: ImportReport,
  media: MediaLibrary,
  pages: readonly WpPage[],
  officeIds: ReadonlyMap<string, string>,
  practiceIds: ReadonlyMap<string, string>,
  normaliseHref: (href: string) => string,
): Promise<Map<string, string>> {
  const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));
  const teamPage = pagesBySlug.get(TEAM_PAGE_SLUG);
  if (!teamPage) throw new Error(`Missing WordPress page ${TEAM_PAGE_SLUG}`);
  const cards = parseTeamCards(teamPage.content.rendered);

  const ids = new Map<string, string>();
  for (const [sortOrder, entry] of TEAM.entries()) {
    const card = cards.get(entry.name);
    if (!card) throw new Error(`Team page has no card for ${entry.name}`);
    const id = await importMember(
      db,
      report,
      media,
      entry,
      sortOrder,
      card,
      pagesBySlug,
      officeIds,
      practiceIds,
      normaliseHref,
    );
    ids.set(toKebabCase(entry.name), id);
  }
  return ids;
}
