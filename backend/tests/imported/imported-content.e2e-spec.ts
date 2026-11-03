import type { NestExpressApplication } from '@nestjs/platform-express';
import {
  API_PREFIX,
  API_ROUTES,
  HOME_PAGE_SLUG,
  categoryResponseSchema,
  insightDetailSchema,
  insightListResponseSchema,
  pageResponseSchema,
  practiceAreaDetailSchema,
  practiceAreaSummarySchema,
  redirectResponseSchema,
  resolveResponseSchema,
  searchResponseSchema,
  teamDetailSchema,
  teamListResponseSchema,
  webinarDetailSchema,
  webinarSummarySchema,
} from '@waren/shared';
import request from 'supertest';
import { z } from 'zod';
import { createTestApp } from '../create-test-app.js';

const api = `/${API_PREFIX}`;

describe('API against the imported content', () => {
  let app: NestExpressApplication;
  const get = async (url: string, status = 200) =>
    (await request(app.getHttpServer()).get(`${api}/${url}`).expect(status)).body;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('serves settings and offices', async () => {
    const settings = await get(API_ROUTES.settings);
    expect(settings.contact.email).toBe('info@warenlaw.com');
    expect(settings.whatsApp.number).toBe('254719278594');
    expect(await get(API_ROUTES.offices)).toHaveLength(3);
  });

  it.each([HOME_PAGE_SLUG, 'about-us', 'our-partners', 'contact-us', 'privacy-policy'])(
    'serves page %s',
    async (slug) => {
      pageResponseSchema.parse(await get(`${API_ROUTES.pages}/${slug}`));
    },
  );

  it('corrects the About typo', async () => {
    const about = JSON.stringify(await get(`${API_ROUTES.pages}/about-us`));
    expect(about).toContain('Integrity');
    expect(about).not.toContain('Intergrity');
  });

  it('serves 8 practice areas, with a merged debt page free of claims', async () => {
    const areas = z.array(practiceAreaSummarySchema).parse(await get(API_ROUTES.practiceAreas));
    expect(areas).toHaveLength(8);
    const debt = practiceAreaDetailSchema.parse(
      await get(`${API_ROUTES.practiceAreas}/corporate-debt-recovery`),
    );
    expect(debt.team.length).toBeGreaterThan(0);
    expect(debt.insights.length).toBeGreaterThan(0);
    const text = JSON.stringify(debt);
    expect(text).not.toMatch(/98%|\[Client Name\]|Financial Institution\]|500\+ Clients/);
  });

  it('serves 20 team members and full profiles', async () => {
    const team = teamListResponseSchema.parse(await get(API_ROUTES.team));
    expect(team.total).toBe(20);
    const profiles = team.groups.flatMap(({ members }) => members).filter((m) => m.hasProfile);
    expect(profiles).toHaveLength(10);
    const cecilia = teamDetailSchema.parse(await get(`${API_ROUTES.team}/cecilia-njeri`));
    expect(cecilia.email).toBe('cwangeci@warenlaw.com');
    expect(cecilia.experience?.length).toBeGreaterThan(0);
    const janice = teamDetailSchema.parse(await get(`${API_ROUTES.team}/janice-wachuka`));
    expect(janice.longBio?.blocks.length).toBeGreaterThan(0);
    await get(`${API_ROUTES.team}/alex-maina`, 404);
  });

  it('serves 32 insights with bodies, FAQ and related', async () => {
    const list = insightListResponseSchema.parse(await get(`${API_ROUTES.insights}?pageSize=50`));
    expect(list.total).toBe(32);
    const insight = insightDetailSchema.parse(
      await get(`${API_ROUTES.insights}/kenya-energy-projects`),
    );
    expect(insight.body.blocks.length).toBeGreaterThan(10);
    expect(insight.faq.length).toBeGreaterThan(0);
    expect(insight.related.length).toBeGreaterThan(0);
    await get(`${API_ROUTES.insights}/recovering-assets-legal-strategies-for-success-2`, 404);
  });

  it('serves 9 categories', async () => {
    const categories = z.array(categoryResponseSchema).parse(await get(API_ROUTES.categories));
    expect(categories).toHaveLength(9);
    expect(categories.find(({ slug }) => slug === 'data-protection')?.insightCount).toBe(4);
  });

  it('serves 3 webinars with panels', async () => {
    const webinars = z.array(webinarSummarySchema).parse(await get(API_ROUTES.webinars));
    expect(webinars).toHaveLength(3);
    const past = webinarDetailSchema.parse(
      await get(`${API_ROUTES.webinars}/trusts-taxes-protecting-wealth-across-borders`),
    );
    expect(past.state).toBe('past');
    expect(past.registrationUrl).toBeNull();
    expect(past.panel).toHaveLength(3);
  });

  it('serves partners and the award, but no logos or testimonials', async () => {
    expect(await get(API_ROUTES.partners)).toHaveLength(3);
    expect(await get(API_ROUTES.awards)).toHaveLength(1);
    expect(await get(API_ROUTES.clientLogos)).toEqual([]);
    expect(await get(API_ROUTES.testimonials)).toEqual([]);
  });

  it('resolves root slugs', async () => {
    for (const [slug, type] of [
      ['mining-energy-law', 'practice_area'],
      ['kenya-energy-projects', 'insight'],
      ['about-us', 'page'],
      ['wealth-built-abroad-protected-in-kenya-webinar', 'webinar'],
    ]) {
      expect(resolveResponseSchema.parse(await get(`${API_ROUTES.resolve}/${slug}`))).toEqual({
        type,
        slug,
      });
    }
  });

  it('searches real content', async () => {
    const results = searchResponseSchema.parse(await get(`${API_ROUTES.search}?q=succession`));
    expect(results.results.length).toBeGreaterThan(0);
    const person = searchResponseSchema.parse(await get(`${API_ROUTES.search}?q=Cecilia`));
    expect(person.results.map(({ slug }) => slug)).toContain('cecilia-njeri');
  });

  it('looks up redirects', async () => {
    const redirect = redirectResponseSchema.parse(
      await get(`${API_ROUTES.redirects}?path=/debt-solutions-recovery-asset-tracing/`),
    );
    expect(redirect.toPath).toBe('/corporate-debt-recovery/');
  });
});
