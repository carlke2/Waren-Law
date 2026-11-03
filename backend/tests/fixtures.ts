import { BLOCK_DOCUMENT_VERSION } from '@waren/shared';
import type { PrismaService } from '../src/database/prisma.service.js';
import { claimSlug } from '../src/database/slug-registry.js';

const TABLES_TO_CLEAR = [
  'Setting',
  'Slug',
  'Testimonial',
  'Award',
  'ClientLogo',
  'Redirect',
  'Webinar',
  'Insight',
  'TeamMember',
  'Office',
  'Partner',
  'PracticeArea',
  'Category',
  'Page',
  'Media',
];

const paragraph = (text: string) => ({
  version: BLOCK_DOCUMENT_VERSION,
  blocks: [{ type: 'paragraph', content: [{ text }] }],
});

export const FIXTURE = {
  published: { status: 'published' as const, publishedAt: new Date('2026-01-01T00:00:00Z') },
  approved: { status: 'published' as const, legalReviewStatus: 'approved' as const },
};

export async function seedFixtures(prisma: PrismaService): Promise<void> {
  const tables = TABLES_TO_CLEAR.map((table) => `"${table}"`).join(', ');
  await prisma.$executeRawUnsafe(`TRUNCATE ${tables} CASCADE`);

  const image = await prisma.media.create({
    data: {
      fileName: 'fixture.webp',
      originalName: 'fixture.png',
      mimeType: 'image/webp',
      sizeBytes: 10,
      width: 100,
      height: 100,
      altText: 'Fixture image',
    },
  });
  const { approved, published } = FIXTURE;

  await prisma.setting.create({
    data: { key: 'contact', value: { email: 'hello@example.test' } },
  });

  const partner = await prisma.partner.create({
    data: {
      slug: 'fixture-partner',
      name: 'Fixture Partner',
      description: 'A partner firm',
      ...published,
      gallery: { connect: { id: image.id } },
    },
  });
  await prisma.partner.create({
    data: { slug: 'draft-partner', name: 'Draft Partner', description: 'Hidden' },
  });
  const office = await prisma.office.create({
    data: {
      slug: 'fixture-office',
      name: 'Fixture Office',
      type: 'joint',
      addressLine: '1 Test Road',
      city: 'Nairobi',
      country: 'Kenya',
      latitude: 1.5,
      ...published,
      partnerId: partner.id,
    },
  });
  await prisma.office.create({
    data: {
      slug: 'draft-office',
      name: 'Draft Office',
      type: 'branch',
      addressLine: '2 Test Road',
      city: 'Nairobi',
      country: 'Kenya',
    },
  });

  const page = await prisma.page.create({
    data: {
      slug: 'fixture-page',
      title: 'Fixture Page',
      body: { version: BLOCK_DOCUMENT_VERSION, blocks: [{ type: 'image', mediaId: image.id }] },
      template: 'legal',
      ...approved,
    },
  });
  await claimSlug(prisma, { slug: page.slug, type: 'page', entityId: page.id });
  const unapprovedPage = await prisma.page.create({
    data: {
      slug: 'unapproved-page',
      title: 'Unapproved',
      body: paragraph('Hidden'),
      template: 'legal',
      status: 'published',
    },
  });
  await claimSlug(prisma, { slug: unapprovedPage.slug, type: 'page', entityId: unapprovedPage.id });

  const category = await prisma.category.create({
    data: { slug: 'fixture-category', name: 'Fixture Category', status: 'published' },
  });
  const otherCategory = await prisma.category.create({
    data: { slug: 'other-category', name: 'Other Category', status: 'published' },
  });

  const practice = await prisma.practiceArea.create({
    data: {
      slug: 'fixture-practice',
      name: 'Fixture Practice',
      shortSummary: 'Practice summary',
      body: paragraph('Practice body'),
      faq: [{ question: 'Q?', answer: 'A.' }],
      searchText: 'arbitration specialists',
      ...approved,
      categoryId: category.id,
    },
  });
  await claimSlug(prisma, { slug: practice.slug, type: 'practice_area', entityId: practice.id });
  await prisma.practiceArea.create({
    data: {
      slug: 'draft-practice',
      name: 'Draft Practice',
      shortSummary: 'Hidden',
      body: paragraph('Hidden'),
      searchText: 'arbitration hidden',
    },
  });

  const advocate = await prisma.teamMember.create({
    data: {
      slug: 'fixture-advocate',
      fullName: 'Fixture Advocate',
      roleTitle: 'Partner',
      memberType: 'partner',
      isAdvocate: true,
      shortBio: 'A partner who practises conveyancing',
      longBio: paragraph('Long biography'),
      experience: ['Experience item'],
      languages: ['English'],
      email: 'advocate@example.test',
      hasProfile: true,
      sortOrder: 1,
      ...published,
      portraitId: image.id,
      officeId: office.id,
      practiceAreas: { connect: { id: practice.id } },
    },
  });
  await prisma.teamMember.create({
    data: {
      slug: 'fixture-staff',
      fullName: 'Fixture Staff',
      roleTitle: 'Clerk',
      memberType: 'staff',
      shortBio: 'A clerk',
      languages: [],
      sortOrder: 2,
      ...published,
    },
  });
  await prisma.teamMember.create({
    data: {
      slug: 'draft-member',
      fullName: 'Draft Member',
      roleTitle: 'Partner',
      memberType: 'partner',
      shortBio: 'Hidden',
      languages: [],
      hasProfile: true,
    },
  });

  const insight = (slug: string, publishedAt: string, categoryId: string) =>
    prisma.insight.create({
      data: {
        slug,
        title: `Insight ${slug}`,
        excerpt: 'An excerpt',
        faq: [{ question: 'Q?', answer: 'A.' }],
        body: paragraph('Insight body'),
        searchText: 'conveyancing guide',
        readingMinutes: 2,
        ...approved,
        publishedAt: new Date(publishedAt),
        featuredImageId: image.id,
        categories: { connect: { id: categoryId } },
        practiceAreas: { connect: { id: practice.id } },
        authors: { connect: { id: advocate.id } },
      },
    });
  const first = await insight('first-insight', '2026-02-01T00:00:00Z', category.id);
  const second = await insight('second-insight', '2026-03-01T00:00:00Z', category.id);
  const third = await insight('third-insight', '2026-04-01T00:00:00Z', otherCategory.id);
  for (const row of [first, second, third]) {
    await claimSlug(prisma, { slug: row.slug, type: 'insight', entityId: row.id });
  }
  const pending = await prisma.insight.create({
    data: {
      slug: 'pending-insight',
      title: 'Pending review',
      excerpt: 'Hidden',
      body: paragraph('Hidden'),
      searchText: 'conveyancing hidden',
      readingMinutes: 1,
      status: 'published',
      legalReviewStatus: 'needs_advocate_review',
      categories: { connect: { id: category.id } },
      practiceAreas: { connect: { id: practice.id } },
    },
  });
  await claimSlug(prisma, { slug: pending.slug, type: 'insight', entityId: pending.id });

  const recording = await prisma.webinar.create({
    data: {
      slug: 'recording-webinar',
      title: 'Recording Webinar',
      summary: 'A recording',
      body: paragraph('Webinar body'),
      state: 'recording',
      recordingGated: true,
      ...approved,
      panel: { connect: { id: advocate.id } },
    },
  });
  await claimSlug(prisma, { slug: recording.slug, type: 'webinar', entityId: recording.id });
  await prisma.webinar.create({
    data: {
      slug: 'past-webinar',
      title: 'Past Webinar',
      summary: 'Past',
      body: paragraph('Webinar body'),
      state: 'past',
      ...approved,
    },
  });
  await prisma.webinar.create({
    data: {
      slug: 'draft-webinar',
      title: 'Draft Webinar',
      summary: 'Hidden',
      body: paragraph('Hidden'),
      state: 'upcoming',
    },
  });

  await prisma.award.createMany({
    data: [
      {
        slug: 'visible-award',
        name: 'Visible',
        awarder: 'A',
        year: 2025,
        category: 'C',
        status: 'published',
      },
      {
        slug: 'hidden-award',
        name: 'Hidden',
        awarder: 'A',
        year: 2025,
        category: 'C',
        status: 'published',
        visible: false,
      },
    ],
  });
  await prisma.clientLogo.createMany({
    data: [
      {
        slug: 'permitted-logo',
        name: 'Permitted',
        altText: 'Permitted logo',
        permissionConfirmed: true,
        visible: true,
        status: 'published',
        logoId: image.id,
      },
      {
        slug: 'unpermitted-logo',
        name: 'Unpermitted',
        altText: 'Unpermitted logo',
        permissionConfirmed: false,
        visible: true,
        status: 'published',
        logoId: image.id,
      },
    ],
  });
  await prisma.testimonial.createMany({
    data: [
      {
        quote: 'Approved quote',
        attribution: 'Client A',
        consentConfirmed: true,
        approvedByFirm: true,
        visible: true,
        status: 'published',
      },
      {
        quote: 'No consent quote',
        attribution: 'Client B',
        consentConfirmed: false,
        approvedByFirm: true,
        visible: true,
        status: 'published',
      },
    ],
  });
  await prisma.redirect.create({
    data: { fromPath: '/old-path/', toPath: '/fixture-page/', statusCode: 301 },
  });
}
