import { Injectable } from '@nestjs/common';
import type { PartnerResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { PUBLISHED } from '../content/visibility.js';

@Injectable()
export class PartnersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list(): Promise<PartnerResponse[]> {
    const partners = await this.prisma.partner.findMany({
      where: PUBLISHED,
      include: { logo: true, gallery: { orderBy: { fileName: 'asc' } } },
      orderBy: { sortOrder: 'asc' },
    });
    return partners.map((partner) => ({
      slug: partner.slug,
      name: partner.name,
      description: partner.description,
      websiteUrl: partner.websiteUrl,
      logo: this.present.optionalMedia(partner.logo),
      gallery: partner.gallery.map((image) => this.present.media(image)),
    }));
  }
}
