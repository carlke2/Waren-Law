import { Inject, Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import type {
  Attribution,
  ConsultationRequest,
  ContactRequest,
  ContactResponse,
  RecordingRequest,
} from '@waren/shared';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import type { Prisma } from '../../../prisma/generated/client.js';
import { resolveAttribution } from '../leads/attribution.js';
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

  submit(request: ContactRequest): Promise<ContactResponse> {
    return this.store(request, {
      form: 'contact',
      name: request.name,
      email: request.email,
      phone: request.phone || null,
      country: request.country,
      message: request.message,
    });
  }

  consultation(request: ConsultationRequest): Promise<ContactResponse> {
    return this.store(request, {
      form: 'consultation',
      name: request.name,
      email: request.email,
      phone: request.phone,
      country: request.country,
      message: request.summary,
      practiceArea: request.practiceArea,
      clientType: request.clientType,
      preferredMeeting: request.preferredMeeting,
      preferredDates: request.preferredDates,
    });
  }

  recording(request: RecordingRequest): Promise<ContactResponse> {
    return this.store(request, { form: 'webinar', name: request.name, email: request.email });
  }

  private async store(
    request: Attribution & { website?: string | undefined },
    fields: Omit<Prisma.ContactSubmissionCreateInput, 'page'>,
  ): Promise<ContactResponse> {
    // A filled honeypot means a bot: it gets the normal answer, so it learns nothing.
    if (request.website) return RECEIVED;

    const attribution = resolveAttribution(request);
    const submission = await this.prisma.contactSubmission.create({
      data: { ...fields, ...attribution, consentAt: new Date() },
    });
    this.logger.log(
      `Lead form=${submission.form} channel=${submission.channel} source=${submission.source} country=${submission.country ?? '-'}`,
    );

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
