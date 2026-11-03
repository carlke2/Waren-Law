import { Injectable, NotFoundException } from '@nestjs/common';
import { faqSchema, type WebinarDetail, type WebinarSummary } from '@waren/shared';
import type { Media, Webinar, WebinarState } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { TEAM_SUMMARY_INCLUDE } from '../content/content-queries.js';
import { PUBLISHED, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class WebinarsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  private summary(webinar: Webinar & { heroImage: Media | null }): WebinarSummary {
    return {
      slug: webinar.slug,
      title: webinar.title,
      summary: webinar.summary,
      state: webinar.state,
      startsAt: webinar.startsAt?.toISOString() ?? null,
      timezone: webinar.timezone,
      audience: webinar.audience,
      heroImage: this.present.optionalMedia(webinar.heroImage),
    };
  }

  async list(state?: WebinarState): Promise<WebinarSummary[]> {
    const webinars = await this.prisma.webinar.findMany({
      where: { ...PUBLISHED_AND_APPROVED, ...(state ? { state } : {}) },
      include: { heroImage: true },
      orderBy: [{ startsAt: { sort: 'desc', nulls: 'last' } }, { slug: 'asc' }],
    });
    return webinars.map((webinar) => this.summary(webinar));
  }

  async bySlug(slug: string): Promise<WebinarDetail> {
    const webinar = await this.prisma.webinar.findFirst({
      where: { slug, ...PUBLISHED_AND_APPROVED },
      include: {
        heroImage: true,
        ogImage: true,
        panel: { where: PUBLISHED, include: TEAM_SUMMARY_INCLUDE, orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!webinar) throw new NotFoundException(`No webinar found for "${slug}"`);
    return {
      ...this.summary(webinar),
      body: await this.present.document(webinar.body),
      faq: faqSchema.parse(webinar.faq),
      registrationUrl: webinar.registrationUrl,
      recordingUrl: webinar.recordingUrl,
      recordingGated: webinar.recordingGated,
      panel: webinar.panel.map((member) => this.present.teamSummary(member)),
      seo: this.present.seo(webinar),
    };
  }
}
