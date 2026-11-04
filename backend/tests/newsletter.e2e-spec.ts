import type { NestExpressApplication } from '@nestjs/platform-express';
import {
  API_PREFIX,
  API_ROUTES,
  NEWSLETTER_CONFIRM_PATH,
  newsletterResponseSchema,
} from '@waren/shared';
import request from 'supertest';
import { PrismaService } from '../src/database/prisma.service.js';
import { createTestApp } from './create-test-app.js';

const url = `/${API_PREFIX}/${API_ROUTES.newsletter}`;
const EMAIL = 'asha@example.test';

describe('POST /api/v1/newsletter without SMTP', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  const post = (body: object) => request(app.getHttpServer()).post(url).send(body);

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
  });

  beforeEach(() => prisma.subscriber.deleteMany());

  afterAll(async () => {
    await prisma.subscriber.deleteMany();
    await app.close();
  });

  it('stores a normalised address with its consent time, and no token', async () => {
    const response = await post({ email: ` ${EMAIL.toUpperCase()} `, page: '/' }).expect(200);
    expect(newsletterResponseSchema.parse(response.body)).toEqual({ received: true });
    const [stored] = await prisma.subscriber.findMany();
    expect(stored).toMatchObject({
      email: EMAIL,
      signupType: 'newsletter',
      page: '/',
      channel: 'Direct',
      confirmedAt: null,
      confirmationTokenHash: null,
    });
    expect(stored?.consentAt).toBeInstanceOf(Date);
  });

  it.each([
    ['a bad address', { email: 'nope', page: '/' }],
    ['a missing address', {}],
    ['an oversized address', { email: `${'x'.repeat(200)}@example.test`, page: '/' }],
  ])('rejects %s and stores nothing', async (_name, body) => {
    await post(body).expect(400);
    await expect(prisma.subscriber.count()).resolves.toBe(0);
  });

  it('answers a filled honeypot as normal but discards it', async () => {
    const response = await post({
      email: EMAIL,
      page: '/',
      website: 'https://spam.example',
    }).expect(200);
    expect(response.body).toEqual({ received: true });
    await expect(prisma.subscriber.count()).resolves.toBe(0);
  });

  it('gives the same answer for an existing address and keeps one record', async () => {
    await post({ email: EMAIL, page: '/' }).expect(200);
    const response = await post({ email: EMAIL, page: '/' }).expect(200);
    expect(response.body).toEqual({ received: true });
    await expect(prisma.subscriber.count()).resolves.toBe(1);
  });
});

describe('newsletter double opt-in', () => {
  let app: NestExpressApplication;
  let prisma: PrismaService;
  const sendMail = vi.fn();
  const post = (body: object) => request(app.getHttpServer()).post(url).send(body);

  const emailedToken = () => {
    const [message] = sendMail.mock.calls.at(-1) ?? [];
    return new URL((message.text as string).split('\n')[2] ?? '').searchParams.get('token') ?? '';
  };

  beforeAll(async () => {
    process.env.SMTP_FROM = 'website@example.test';
    app = await createTestApp({ sendMail });
    prisma = app.get(PrismaService);
  });

  beforeEach(async () => {
    sendMail.mockReset();
    await prisma.subscriber.deleteMany();
  });

  afterAll(async () => {
    delete process.env.SMTP_FROM;
    await prisma.subscriber.deleteMany();
    await app.close();
  });

  it('emails a link, stores only a hash of its token, and confirms once', async () => {
    sendMail.mockResolvedValue({});
    await post({ email: EMAIL, page: '/' }).expect(200);
    expect(sendMail).toHaveBeenCalledOnce();
    expect(sendMail.mock.calls[0]?.[0]).toMatchObject({ to: EMAIL });
    const token = emailedToken();
    const before = await prisma.subscriber.findUniqueOrThrow({ where: { email: EMAIL } });
    expect(before.confirmationTokenHash).toMatch(/^[a-f0-9]{64}$/);
    expect(before.confirmationTokenHash).not.toBe(token);

    const confirm = await request(app.getHttpServer())
      .get(`${url}/${NEWSLETTER_CONFIRM_PATH}`)
      .query({ token })
      .expect(302);
    expect(confirm.headers.location).toBe('http://localhost:3000/');
    const after = await prisma.subscriber.findUniqueOrThrow({ where: { email: EMAIL } });
    expect(after.confirmedAt).toBeInstanceOf(Date);
    expect(after.confirmationTokenHash).toBeNull();
  });

  it('does not email an address that is already confirmed', async () => {
    sendMail.mockResolvedValue({});
    await post({ email: EMAIL, page: '/' }).expect(200);
    await request(app.getHttpServer())
      .get(`${url}/${NEWSLETTER_CONFIRM_PATH}`)
      .query({ token: emailedToken() })
      .expect(302);
    await post({ email: EMAIL, page: '/' }).expect(200);
    expect(sendMail).toHaveBeenCalledOnce();
  });

  it('rejects a malformed token', async () => {
    await request(app.getHttpServer())
      .get(`${url}/${NEWSLETTER_CONFIRM_PATH}`)
      .query({ token: 'nope' })
      .expect(400);
  });

  it('still succeeds and keeps the record when the mail server fails', async () => {
    sendMail.mockRejectedValue(new Error('mail server down'));
    await post({ email: EMAIL, page: '/' }).expect(200);
    await expect(prisma.subscriber.count()).resolves.toBe(1);
  });
});

describe('newsletter rate limit', () => {
  it('limits sign-ups per IP from the environment, without affecting the contact form', async () => {
    process.env.NEWSLETTER_RATE_LIMIT_PER_HOUR = '2';
    const app = await createTestApp();
    try {
      const post = (email: string) =>
        request(app.getHttpServer()).post(url).send({ email, page: '/' });
      await post('a@example.test').expect(200);
      await post('b@example.test').expect(200);
      await post('c@example.test').expect(429);
      await request(app.getHttpServer())
        .get(`${url}/${NEWSLETTER_CONFIRM_PATH}`)
        .query({ token: 'a'.repeat(64) })
        .expect(302);
    } finally {
      process.env.NEWSLETTER_RATE_LIMIT_PER_HOUR = '100000';
      await app.get(PrismaService).subscriber.deleteMany();
      await app.close();
    }
  });
});
