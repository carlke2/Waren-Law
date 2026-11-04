import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { heroCardsSchema, HOME_PAGE_SLUG, type HomeResponse } from '@waren/shared';
import { ContentStatus, LegalReviewStatus } from '../../../prisma/generated/client.js';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';

@Injectable()
export class HomeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async get(): Promise<HomeResponse> {
    const home = await this.prisma.homeContent.findFirst({
      where: {
        page: { slug: HOME_PAGE_SLUG, status: ContentStatus.published },
        ...(this.env.PREVIEW_UNREVIEWED_PAGES
          ? {}
          : { legalReviewStatus: LegalReviewStatus.approved }),
      },
      include: { heroImage: true, page: { include: { ogImage: true } } },
    });
    if (!home) throw new NotFoundException('No home content is available');
    return {
      heroImage: this.present.media(home.heroImage),
      heroVideoUrl: home.heroVideoUrl,
      heroCards: heroCardsSchema.parse(home.heroCards),
      pageH1: home.pageH1,
      welcomeTitle: home.welcomeTitle,
      welcomeBody: await this.present.document(home.welcomeBody),
      welcomeCtaLabel: home.welcomeCtaLabel,
      expertiseTitle: home.expertiseTitle,
      expertiseIntro: home.expertiseIntro,
      teamTitle: home.teamTitle,
      teamIntro: home.teamIntro,
      insightsTitle: home.insightsTitle,
      ctaTitle: home.ctaTitle,
      ctaBody: home.ctaBody,
      title: home.page.title,
      seo: this.present.seo(home.page),
    };
  }
}
