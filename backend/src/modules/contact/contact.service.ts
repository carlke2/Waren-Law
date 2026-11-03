import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type { ContactRequest, ContactResponse } from '@waren/shared';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { HOUR_IN_MS } from './contact.constants.js';
import { ContactMailer } from './contact-mailer.service.js';

const RECEIVED: ContactResponse = { received: true };

@Injectable()
export class ContactService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(ContactService.name);
  private retentionTimer?: NodeJS.Timeout;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: ContactMailer,
    @Inject(ENV) private readonly env: Env,
  ) {}

  onModuleInit(): void {
    this.retentionTimer = setInterval(
      () => void this.deleteExpiredSafely(),
      this.env.CONTACT_RETENTION_INTERVAL_HOURS * HOUR_IN_MS,
    );
    this.retentionTimer.unref();
  }

  onModuleDestroy(): void {
    clearInterval(this.retentionTimer);
  }

  async submit(request: ContactRequest): Promise<ContactResponse> {
    // A filled honeypot means a bot: it gets the normal answer, so it learns nothing.
    if (request.website) return RECEIVED;

    const submission = await this.prisma.contactSubmission.create({
      data: {
        name: `${request.firstName} ${request.lastName}`,
        email: request.email,
        phone: request.phone || null,
        message: request.message,
        source: request.source,
        consentAt: new Date(),
      },
    });

    try {
      if (await this.mailer.send(submission)) {
        await this.prisma.contactSubmission.update({
          where: { id: submission.id },
          data: { emailedAt: new Date() },
        });
      }
    } catch (error) {
      // The enquiry is stored, so a mail outage must not fail the visitor.
      this.logger.error(
        `Could not email submission ${submission.id}: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
    }
    return RECEIVED;
  }

  async deleteExpired(now = new Date()): Promise<number> {
    const cutoff = new Date(now);
    cutoff.setMonth(cutoff.getMonth() - this.env.CONTACT_RETENTION_MONTHS);
    const { count } = await this.prisma.contactSubmission.deleteMany({
      where: { createdAt: { lt: cutoff } },
    });
    return count;
  }

  private async deleteExpiredSafely(): Promise<void> {
    try {
      const count = await this.deleteExpired();
      if (count) this.logger.log(`Deleted ${count} expired contact submissions`);
    } catch (error) {
      this.logger.error(
        `Retention job failed: ${error instanceof Error ? error.message : 'unknown error'}`,
      );
    }
  }
}
