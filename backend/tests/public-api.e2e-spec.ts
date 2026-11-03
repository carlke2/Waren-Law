import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { NestExpressApplication } from '@nestjs/platform-express';
import {
  API_PREFIX,
  API_ROUTES,
  awardResponseSchema,
  categoryResponseSchema,
  clientLogoResponseSchema,
  insightDetailSchema,
  insightListResponseSchema,
  officeResponseSchema,
  pageResponseSchema,
  partnerResponseSchema,
  practiceAreaDetailSchema,
  practiceAreaSummarySchema,
  PUBLIC_CACHE_CONTROL,
  redirectResponseSchema,
  resolveResponseSchema,
  searchResponseSchema,
  settingsResponseSchema,
  teamDetailSchema,
  teamListResponseSchema,
  testimonialResponseSchema,
  webinarDetailSchema,
  webinarSummarySchema,
} from '@waren/shared';
import request from 'supertest';
import { z } from 'zod';
import { PrismaService } from '../src/database/prisma.service.js';
import { createTestApp } from './create-test-app.js';
import { seedFixtures } from './fixtures.js';

const api = `/${API_PREFIX}`;

describe('public read API', () => {
  let app: NestExpressApplication;

  const get = (url: string, status = 200) =>
    request(app.getHttpServer()).get(`${api}/${url}`).expect(status);

  beforeAll(async () => {
    app = await createTestApp();
    await seedFixtures(app.get(PrismaService));
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET settings returns values by key, with caching headers', async () => {
    const response = await get(API_ROUTES.settings);
    expect(settingsResponseSchema.parse(response.body)).toEqual({
      contact: { email: 'hello@example.test' },
    });
    expect(response.headers['cache-control']).toBe(PUBLIC_CACHE_CONTROL);
  });

  it('GET offices leaves out drafts', async () => {
    const offices = z.array(officeResponseSchema).parse((await get(API_ROUTES.offices)).body);
    expect(offices.map(({ slug }) => slug)).toEqual(['fixture-office']);
    expect(offices[0]?.latitude).toBe(1.5);
  });

  describe('pages', () => {
    it('returns a page with image blocks resolved to media', async () => {
      const page = pageResponseSchema.parse((await get(`${API_ROUTES.pages}/fixture-page`)).body);
      expect(page.body.blocks[0]).toMatchObject({
        type: 'image',
        media: { url: 'http://localhost:4000/uploads/fixture.webp', alt: 'Fixture image' },
      });
    });

    it('hides a published page awaiting legal approval', async () => {
      await get(`${API_ROUTES.pages}/unapproved-page`, 404);
    });

    it('rejects a malformed slug', async () => {
      await get(`${API_ROUTES.pages}/Not_A_Slug`, 400);
    });
  });

  describe('practice areas', () => {
    it('lists only published and approved areas', async () => {
      const areas = z
        .array(practiceAreaSummarySchema)
        .parse((await get(API_ROUTES.practiceAreas)).body);
      expect(areas.map(({ slug }) => slug)).toEqual(['fixture-practice']);
    });

    it('returns team and approved insights by slug', async () => {
      const area = practiceAreaDetailSchema.parse(
        (await get(`${API_ROUTES.practiceAreas}/fixture-practice`)).body,
      );
      expect(area.team.map(({ slug }) => slug)).toEqual(['fixture-advocate']);
      expect(area.insights.map(({ slug }) => slug)).toEqual([
        'third-insight',
        'second-insight',
        'first-insight',
      ]);
      expect(area.faq).toHaveLength(1);
    });

    it('returns 404 for a draft', async () => {
      await get(`${API_ROUTES.practiceAreas}/draft-practice`, 404);
    });
  });

  describe('team', () => {
    it('groups published members by type', async () => {
      const team = teamListResponseSchema.parse((await get(API_ROUTES.team)).body);
      expect(team.total).toBe(2);
      expect(team.groups.map(({ memberType }) => memberType)).toEqual(['partner', 'staff']);
    });

    it('filters by practice area', async () => {
      const team = teamListResponseSchema.parse(
        (await get(`${API_ROUTES.team}?practiceArea=fixture-practice`)).body,
      );
      expect(team.total).toBe(1);
      expect(team.groups[0]?.members[0]?.slug).toBe('fixture-advocate');
    });

    it('returns a profile with its insights', async () => {
      const member = teamDetailSchema.parse(
        (await get(`${API_ROUTES.team}/fixture-advocate`)).body,
      );
      expect(member.email).toBe('advocate@example.test');
      expect(member.office?.slug).toBe('fixture-office');
      expect(member.insights).toHaveLength(3);
    });

    it('has no profile for staff or drafts', async () => {
      await get(`${API_ROUTES.team}/fixture-staff`, 404);
      await get(`${API_ROUTES.team}/draft-member`, 404);
    });
  });

  describe('insights', () => {
    it('paginates newest first, leaving out content awaiting review', async () => {
      const list = insightListResponseSchema.parse(
        (await get(`${API_ROUTES.insights}?pageSize=2&page=1`)).body,
      );
      expect(list.total).toBe(3);
      expect(list.totalPages).toBe(2);
      expect(list.items.map(({ slug }) => slug)).toEqual(['third-insight', 'second-insight']);
    });

    it('filters by category', async () => {
      const list = insightListResponseSchema.parse(
        (await get(`${API_ROUTES.insights}?category=other-category`)).body,
      );
      expect(list.items.map(({ slug }) => slug)).toEqual(['third-insight']);
    });

    it('rejects an oversized page', async () => {
      const response = await get(`${API_ROUTES.insights}?pageSize=9999`, 400);
      expect(response.body.message).toBe('Validation failed');
    });

    it('returns an insight with related insights from its categories', async () => {
      const insight = insightDetailSchema.parse(
        (await get(`${API_ROUTES.insights}/first-insight`)).body,
      );
      expect(insight.related.map(({ slug }) => slug)).toEqual(['second-insight']);
      expect(insight.authors[0]?.slug).toBe('fixture-advocate');
      expect(insight.practiceAreas[0]?.slug).toBe('fixture-practice');
    });

    it('returns 404 for content awaiting review', async () => {
      await get(`${API_ROUTES.insights}/pending-insight`, 404);
    });
  });

  it('GET categories counts only visible insights', async () => {
    const categories = z
      .array(categoryResponseSchema)
      .parse((await get(API_ROUTES.categories)).body);
    expect(categories.find(({ slug }) => slug === 'fixture-category')?.insightCount).toBe(2);
  });

  describe('webinars', () => {
    it('lists visible webinars and filters by state', async () => {
      const all = z.array(webinarSummarySchema).parse((await get(API_ROUTES.webinars)).body);
      expect(all).toHaveLength(2);
      const past = z
        .array(webinarSummarySchema)
        .parse((await get(`${API_ROUTES.webinars}?state=past`)).body);
      expect(past.map(({ slug }) => slug)).toEqual(['past-webinar']);
    });

    it('rejects an unknown state', async () => {
      await get(`${API_ROUTES.webinars}?state=soon`, 400);
    });

    it('returns a webinar with its panel', async () => {
      const webinar = webinarDetailSchema.parse(
        (await get(`${API_ROUTES.webinars}/recording-webinar`)).body,
      );
      expect(webinar.panel.map(({ slug }) => slug)).toEqual(['fixture-advocate']);
      expect(webinar.recordingGated).toBe(true);
    });
  });

  it('GET partners leaves out drafts and includes the gallery', async () => {
    const partners = z.array(partnerResponseSchema).parse((await get(API_ROUTES.partners)).body);
    expect(partners.map(({ slug }) => slug)).toEqual(['fixture-partner']);
    expect(partners[0]?.gallery).toHaveLength(1);
  });

  it('GET awards leaves out hidden awards', async () => {
    const awards = z.array(awardResponseSchema).parse((await get(API_ROUTES.awards)).body);
    expect(awards.map(({ slug }) => slug)).toEqual(['visible-award']);
  });

  it('GET client-logos returns only logos with permission', async () => {
    const logos = z.array(clientLogoResponseSchema).parse((await get(API_ROUTES.clientLogos)).body);
    expect(logos.map(({ slug }) => slug)).toEqual(['permitted-logo']);
  });

  it('GET testimonials returns only those with consent and approval', async () => {
    const quotes = z
      .array(testimonialResponseSchema)
      .parse((await get(API_ROUTES.testimonials)).body);
    expect(quotes.map(({ quote }) => quote)).toEqual(['Approved quote']);
  });

  describe('slug resolver', () => {
    it.each([
      ['fixture-page', 'page'],
      ['fixture-practice', 'practice_area'],
      ['first-insight', 'insight'],
      ['recording-webinar', 'webinar'],
    ])('resolves %s to %s', async (slug, type) => {
      const resolved = resolveResponseSchema.parse(
        (await get(`${API_ROUTES.resolve}/${slug}`)).body,
      );
      expect(resolved).toEqual({ type, slug });
    });

    it('does not resolve unknown or hidden content', async () => {
      await get(`${API_ROUTES.resolve}/no-such-slug`, 404);
      await get(`${API_ROUTES.resolve}/pending-insight`, 404);
      await get(`${API_ROUTES.resolve}/unapproved-page`, 404);
    });
  });

  describe('search', () => {
    it('finds insights, practice areas and team, never hidden content', async () => {
      const conveyancing = searchResponseSchema.parse(
        (await get(`${API_ROUTES.search}?q=conveyancing`)).body,
      );
      const slugs = conveyancing.results.map(({ slug }) => slug);
      expect(slugs).toContain('first-insight');
      expect(slugs).toContain('fixture-advocate');
      expect(slugs).not.toContain('pending-insight');

      const arbitration = searchResponseSchema.parse(
        (await get(`${API_ROUTES.search}?q=arbitration`)).body,
      );
      expect(arbitration.results.map(({ slug }) => slug)).toEqual(['fixture-practice']);
    });

    it('treats operators in the query as plain text', async () => {
      const response = await get(
        `${API_ROUTES.search}?q=${encodeURIComponent("'; DROP TABLE --")}`,
      );
      expect(searchResponseSchema.parse(response.body).results).toEqual([]);
    });

    it('requires a query', async () => {
      await get(API_ROUTES.search, 400);
    });
  });

  describe('redirects', () => {
    it('finds a redirect by old path', async () => {
      const redirect = redirectResponseSchema.parse(
        (await get(`${API_ROUTES.redirects}?path=/old-path/`)).body,
      );
      expect(redirect).toEqual({
        fromPath: '/old-path/',
        toPath: '/fixture-page/',
        statusCode: 301,
      });
    });

    it('returns 404 for an unknown path and 400 for a bad one', async () => {
      await get(`${API_ROUTES.redirects}?path=/nope/`, 404);
      await get(`${API_ROUTES.redirects}?path=nope`, 400);
    });
  });

  it('serves uploaded media to other origins', async () => {
    const dir = path.resolve(process.env.UPLOADS_DIR ?? '');
    const file = path.join(dir, 'e2e-probe.webp');
    await mkdir(dir, { recursive: true });
    await writeFile(file, 'probe');
    try {
      const response = await request(app.getHttpServer())
        .get('/uploads/e2e-probe.webp')
        .expect(200);
      expect(response.headers['cross-origin-resource-policy']).toBe('cross-origin');
    } finally {
      await rm(file);
    }
  });
});
