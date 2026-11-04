import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { SETTING_KEYS, siteSettingsSchema } from '@waren/shared';
import type { ContactSubmission } from '../../../prisma/generated/client.js';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { CONTACT_EMAIL_SUBJECT, MAIL_TRANSPORT } from './contact.constants.js';

export interface MailTransport {
  sendMail(message: {
    from: string;
    to: string;
    replyTo?: string;
    subject: string;
    text: string;
  }): Promise<unknown>;
}

const firmContactSchema = siteSettingsSchema.shape[SETTING_KEYS.contact].pick({ email: true });

export function contactEmailBody(submission: ContactSubmission): string {
  return [
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone ?? '-'}`,
    `Page: ${submission.source}`,
    `Time: ${submission.createdAt.toISOString()}`,
    '',
    submission.message,
  ].join('\n');
}

@Injectable()
export class ContactMailer implements OnModuleInit {
  private readonly logger = new Logger(ContactMailer.name);

  constructor(
    private readonly prisma: PrismaService,
    @Inject(ENV) private readonly env: Env,
    @Inject(MAIL_TRANSPORT) private readonly transport: MailTransport | null,
  ) {}

  onModuleInit(): void {
    if (!this.transport) {
      this.logger.warn('Email delivery is disabled: SMTP settings are not configured');
    }
  }

  async send(submission: ContactSubmission): Promise<boolean> {
    if (!this.transport || !this.env.SMTP_FROM) return false;
    const setting = await this.prisma.setting.findUniqueOrThrow({
      where: { key: SETTING_KEYS.contact },
    });
    await this.transport.sendMail({
      from: this.env.SMTP_FROM,
      to: firmContactSchema.parse(setting.value).email,
      replyTo: submission.email,
      subject: CONTACT_EMAIL_SUBJECT,
      text: contactEmailBody(submission),
    });
    return true;
  }
}
