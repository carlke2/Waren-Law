import type { NestExpressApplication } from '@nestjs/platform-express';
import { API_PREFIX, API_ROUTES, LEADS_API_KEY_HEADER, LEADS_PATHS } from '@waren/shared';
import request from 'supertest';
import { PrismaService } from '../src/database/prisma.service.js';
import { createTestApp } from './create-test-app.js';

const base = `/${API_PREFIX}/${API_ROUTES.leads}`;
const KEY = 'test-leads-key';

describe('leads API', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  const get = (path: string) =>
    request(app.getHttpServer()).get(path).set(LEADS_API_KEY_HEADER, KEY);

  beforeAll(async () => {
    process.env.LEADS_API_KEY = KEY;
    app = await createTestApp();
    prisma = app.get(PrismaService);
    await prisma.contactSubmission.deleteMany();
    await prisma.subscriber.deleteMany();
    await prisma.contactSubmission.create({
      data: {
        name: '=Asha',
        email: 'asha@example.test',
        page: '/contact-us/',
        form: 'contact',
        channel: 'Search',
        source: 'google.com',
        country: 'Kenya',
      },
    });
    await prisma.subscriber.create({
      data: {
        email: 'ben@example.test',
        signupType: 'newsletter',
        consentAt: new Date(),
        channel: 'Social',
        source: 'linkedin.com',
      },
    });
  });

  afterAll(async () => {
    delete process.env.LEADS_API_KEY;
    await prisma.contactSubmission.deleteMany();
    await prisma.subscriber.deleteMany();
    await app.close();
  });

  it('refuses a request without the key, or with the wrong one', async () => {
    await request(app.getHttpServer()).get(base).expect(403);
    await request(app.getHttpServer()).get(base).set(LEADS_API_KEY_HEADER, 'wrong').expect(403);
  });

  it('lists enquiries and subscribers, and filters them', async () => {
    const all = await get(base).expect(200);
    expect(all.body.total).toBe(2);
    const search = await get(`${base}?channel=Search`).expect(200);
    expect(search.body.items.map((row: { email: string }) => row.email)).toEqual([
      'asha@example.test',
    ]);
    const kenya = await get(`${base}?country=Kenya`).expect(200);
    expect(kenya.body.total).toBe(1);
  });

  it("exports CSV that a spreadsheet can't run as a formula", async () => {
    const response = await get(`${base}/${LEADS_PATHS.export}`).expect(200);
    expect(response.headers['content-type']).toContain('text/csv');
    expect(response.text).toContain(`"'=Asha"`);
  });

  it('summarises each month by channel and country', async () => {
    const response = await get(`${base}/${LEADS_PATHS.summary}`).expect(200);
    const [month] = response.body.months;
    expect(month.total).toBe(2);
    expect(month.byChannel).toEqual({ Search: 1, Social: 1 });
    expect(month.byCountry).toEqual({ Kenya: 1, 'Not given': 1 });
  });
});
