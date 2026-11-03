import type { NestExpressApplication } from '@nestjs/platform-express';
import { API_PREFIX, API_ROUTES, SETTING_KEYS, contactResponseSchema } from '@waren/shared';
import request from 'supertest';
import { PrismaService } from '../src/database/prisma.service.js';
import { ContactService } from '../src/modules/contact/contact.service.js';
import { createTestApp } from './create-test-app.js';

const url = `/${API_PREFIX}/${API_ROUTES.contact}`;
const FIRM_EMAIL = 'firm@example.test';

const valid = {
  firstName: 'Asha',
  lastName: 'Otieno',
  email: 'asha@example.test',
  phone: '+254700000000',
  message: 'I need help with a property purchase.',
  source: '/contact-us/',
};

describe('POST /api/v1/contact', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  const post = (body: object) => request(app.getHttpServer()).post(url).send(body);

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    await prisma.contactSubmission.deleteMany();
  });

  afterAll(async () => {
    await prisma.contactSubmission.deleteMany();
    await app.close();
  });

  it('stores a valid submission with minimal data, and succeeds without SMTP', async () => {
    const response = await post(valid).expect(200);
    expect(contactResponseSchema.parse(response.body)).toEqual({ received: true });
    const [stored] = await prisma.contactSubmission.findMany();
    expect(stored).toMatchObject({
      name: 'Asha Otieno',
      email: valid.email,
      phone: valid.phone,
      message: valid.message,
      source: valid.source,
      emailedAt: null,
    });
    expect(stored?.consentAt).toBeInstanceOf(Date);
    expect(Object.keys(stored ?? {})).not.toContain('ip');
  });

  it.each([
    ['a bad email', { email: 'nope' }],
    ['an empty message', { message: '   ' }],
    ['a missing first name', { firstName: '' }],
    ['a source that is not a path', { source: 'https://evil.example' }],
    ['an oversized message', { message: 'x'.repeat(5001) }],
  ])('rejects %s and stores nothing', async (_name, change) => {
    const response = await post({ ...valid, ...change }).expect(400);
    expect(response.body.message).toBe('Validation failed');
    await expect(prisma.contactSubmission.count()).resolves.toBe(0);
  });

  it('answers a filled honeypot as normal but discards it', async () => {
    const response = await post({ ...valid, website: 'https://spam.example' }).expect(200);
    expect(response.body).toEqual({ received: true });
    await expect(prisma.contactSubmission.count()).resolves.toBe(0);
  });

  it('deletes only submissions past the retention period', async () => {
    const now = new Date('2026-11-05T00:00:00Z');
    await prisma.contactSubmission.createMany({
      data: [
        { ...base('old'), createdAt: new Date('2025-10-01T00:00:00Z') },
        { ...base('recent'), createdAt: new Date('2026-06-01T00:00:00Z') },
      ],
    });
    await expect(app.get(ContactService).deleteExpired(now)).resolves.toBe(1);
    const left = await prisma.contactSubmission.findMany();
    expect(left.map(({ name }) => name)).toEqual(['recent']);
  });

  function base(name: string) {
    return { name, email: 'a@example.test', message: 'm', source: '/' };
  }
});

describe('contact email', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  const sendMail = vi.fn();

  beforeAll(async () => {
    process.env.SMTP_FROM = 'website@example.test';
    app = await createTestApp({ sendMail });
    prisma = app.get(PrismaService);
    await prisma.setting.upsert({
      where: { key: SETTING_KEYS.contact },
      create: { key: SETTING_KEYS.contact, value: { phones: [], email: FIRM_EMAIL } },
      update: { value: { phones: [], email: FIRM_EMAIL } },
    });
  });

  beforeEach(async () => {
    sendMail.mockReset();
    await prisma.contactSubmission.deleteMany();
  });

  afterAll(async () => {
    delete process.env.SMTP_FROM;
    await prisma.contactSubmission.deleteMany();
    await app.close();
  });

  it('sends a plain email to the firm address from Settings', async () => {
    sendMail.mockResolvedValue({});
    await request(app.getHttpServer()).post(url).send(valid).expect(200);
    expect(sendMail).toHaveBeenCalledOnce();
    const [message] = sendMail.mock.calls[0] ?? [];
    expect(message).toMatchObject({
      to: FIRM_EMAIL,
      from: 'website@example.test',
      replyTo: valid.email,
    });
    for (const part of ['Asha Otieno', valid.email, valid.phone, valid.message, valid.source]) {
      expect(message.text).toContain(part);
    }
    expect(message.html).toBeUndefined();
    const [stored] = await prisma.contactSubmission.findMany();
    expect(stored?.emailedAt).toBeInstanceOf(Date);
  });

  it('still succeeds and keeps the record when the mail server fails', async () => {
    sendMail.mockRejectedValue(new Error('mail server down'));
    await request(app.getHttpServer()).post(url).send(valid).expect(200);
    const [stored] = await prisma.contactSubmission.findMany();
    expect(stored?.message).toBe(valid.message);
    expect(stored?.emailedAt).toBeNull();
  });

  it('sends nothing for a honeypot submission', async () => {
    await request(app.getHttpServer())
      .post(url)
      .send({ ...valid, website: 'bot' })
      .expect(200);
    expect(sendMail).not.toHaveBeenCalled();
  });
});

describe('contact rate limit', () => {
  it('limits requests per IP from the environment, without affecting other routes', async () => {
    process.env.CONTACT_RATE_LIMIT_PER_HOUR = '2';
    const app = await createTestApp();
    try {
      const post = () => request(app.getHttpServer()).post(url).send(valid);
      await post().expect(200);
      await post().expect(200);
      await post().expect(429);
      await request(app.getHttpServer()).get(`/${API_PREFIX}/${API_ROUTES.offices}`).expect(200);
    } finally {
      process.env.CONTACT_RATE_LIMIT_PER_HOUR = '100000';
      await app.get(PrismaService).contactSubmission.deleteMany();
      await app.close();
    }
  });
});
