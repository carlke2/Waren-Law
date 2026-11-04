import { createHash, randomBytes } from 'node:crypto';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ROUTES, type NewsletterRequest, type NewsletterResponse } from '@waren/shared';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { resolveAttribution } from '../leads/attribution.js';
import { CONFIRMATION_TOKEN_BYTES } from './newsletter.constants.js';
import { NewsletterMailer } from './newsletter-mailer.service.js';

const RECEIVED: NewsletterResponse = { received: true };

const hashToken = (token: string) => createHash('sha256').update(token).digest('hex');

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: NewsletterMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  // Every outcome gets the same answer, so the form can't reveal who is subscribed.
  async subscribe(request: NewsletterRequest): Promise<NewsletterResponse> {
    const { email, website } = request;
    if (website) return RECEIVED;

    const existing = await this.prisma.subscriber.findUnique({ where: { email } });
    if (existing?.confirmedAt && !existing.unsubscribedAt) return RECEIVED;

    const token = this.mailer.enabled
      ? randomBytes(CONFIRMATION_TOKEN_BYTES).toString('hex')
      : null;
    const confirmationTokenHash = token ? hashToken(token) : null;
    const consentAt = new Date();
    const attribution = resolveAttribution(request);
    const subscriber = await this.prisma.subscriber.upsert({
      where: { email },
      create: { email, signupType: 'newsletter', consentAt, confirmationTokenHash, ...attribution },
      update: {
        consentAt,
        unsubscribedAt: null,
        confirmedAt: null,
        confirmationTokenHash,
        ...attribution,
      },
    });
    this.logger.log(
      `Lead form=${subscriber.form} channel=${subscriber.channel} source=${subscriber.source} country=-`,
    );

    if (token) {
      try {
        await this.mailer.sendConfirmation(email, token);
      } catch (error) {
        // The sign-up is stored, so a mail outage must not fail the visitor.
        this.logger.error(
          `Could not email subscriber ${subscriber.id}: ${error instanceof Error ? error.message : 'unknown error'}`,
        );
      }
    }
    return RECEIVED;
  }

  async confirm(token: string): Promise<string> {
    await this.prisma.subscriber.updateMany({
      where: { confirmationTokenHash: hashToken(token) },
      data: { confirmedAt: new Date(), confirmationTokenHash: null },
    });
    return `${this.env.FRONTEND_URL.replace(/\/$/, '')}${ROUTES.home}`;
  }
}
