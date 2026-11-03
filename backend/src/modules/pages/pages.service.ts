import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PAGE_TEMPLATES, type PageResponse } from '@waren/shared';
import { z } from 'zod';
import { ENV, type Env } from '../../config/config.module.js';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { pageVisibility } from '../content/visibility.js';

const pageTemplateSchema = z.enum(PAGE_TEMPLATES);

@Injectable()
export class PagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
    @Inject(ENV) private readonly env: Env,
  ) {}

  async bySlug(slug: string): Promise<PageResponse> {
    const page = await this.prisma.page.findFirst({
      where: { slug, ...pageVisibility(this.env) },
      include: { ogImage: true },
    });
    if (!page) throw new NotFoundException(`No page found for "${slug}"`);
    return {
      slug: page.slug,
      title: page.title,
      template: pageTemplateSchema.parse(page.template),
      legalReviewStatus: page.legalReviewStatus,
      body: await this.present.document(page.body),
      publishedAt: page.publishedAt?.toISOString() ?? null,
      seo: this.present.seo(page),
    };
  }
}
