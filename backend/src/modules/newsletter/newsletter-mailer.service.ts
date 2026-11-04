import { Inject, Injectable } from '@nestjs/common';
import {
  API_PREFIX,
  API_ROUTES,
  NEWSLETTER_CONFIRM_PATH,
  NEWSLETTER_TOKEN_PARAM,
} from '@waren/shared';
import { ENV, type Env } from '../../config/config.module.js';
import type { MailTransport } from '../contact/contact-mailer.service.js';
import { MAIL_TRANSPORT } from '../contact/contact.constants.js';
import { NEWSLETTER_EMAIL_SUBJECT } from './newsletter.constants.js';

export function confirmationEmailBody(link: string): string {
  return [
    'Please confirm that you want to receive our newsletter by opening this link:',
    '',
    link,
    '',
    'If you did not ask for this, ignore this email and you will not hear from us again.',
  ].join('\n');
}

@Injectable()
export class NewsletterMailer {
  constructor(
    @Inject(ENV) private readonly env: Env,
    @Inject(MAIL_TRANSPORT) private readonly transport: MailTransport | null,
  ) {}

  get enabled(): boolean {
    return Boolean(this.transport && this.env.SMTP_FROM);
  }

  async sendConfirmation(email: string, token: string): Promise<void> {
    if (!this.transport || !this.env.SMTP_FROM) return;
    const base = this.env.FRONTEND_URL.replace(/\/$/, '');
    const path = `${API_PREFIX}/${API_ROUTES.newsletter}/${NEWSLETTER_CONFIRM_PATH}/`;
    await this.transport.sendMail({
      from: this.env.SMTP_FROM,
      to: email,
      subject: NEWSLETTER_EMAIL_SUBJECT,
      text: confirmationEmailBody(`${base}/${path}?${NEWSLETTER_TOKEN_PARAM}=${token}`),
    });
  }
}
