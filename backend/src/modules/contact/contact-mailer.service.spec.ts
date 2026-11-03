import { Logger } from '@nestjs/common';
import type { Env } from '../../config/env.schema.js';
import type { PrismaService } from '../../database/prisma.service.js';
import { ContactMailer, contactEmailBody } from './contact-mailer.service.js';

describe('ContactMailer', () => {
  it('warns once at startup when SMTP is not configured, and never sends', async () => {
    const warn = vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    const mailer = new ContactMailer({} as PrismaService, {} as Env, null);
    mailer.onModuleInit();
    expect(warn).toHaveBeenCalledOnce();
    await expect(mailer.send({} as never)).resolves.toBe(false);
    warn.mockRestore();
  });

  it('does not warn when SMTP is configured', () => {
    const warn = vi.spyOn(Logger.prototype, 'warn').mockImplementation(() => undefined);
    const mailer = new ContactMailer({} as PrismaService, {} as Env, { sendMail: vi.fn() });
    mailer.onModuleInit();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it('writes a plain text body with a dash for a missing phone', () => {
    const body = contactEmailBody({
      name: 'A B',
      email: 'a@example.test',
      phone: null,
      message: 'Hello',
      source: '/contact-us/',
      createdAt: new Date('2026-11-05T10:00:00Z'),
    } as never);
    expect(body).toContain('Phone: -');
    expect(body).toContain('Time: 2026-11-05T10:00:00.000Z');
    expect(body.endsWith('Hello')).toBe(true);
  });
});
