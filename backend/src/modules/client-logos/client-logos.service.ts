import { Injectable } from '@nestjs/common';
import type { ClientLogoResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { PUBLISHED } from '../content/visibility.js';

@Injectable()
export class ClientLogosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async listPermitted(): Promise<ClientLogoResponse[]> {
    const logos = await this.prisma.clientLogo.findMany({
      where: { ...PUBLISHED, permissionConfirmed: true, visible: true },
      include: { logo: true },
      orderBy: { sortOrder: 'asc' },
    });
    return logos.map((logo) => ({
      slug: logo.slug,
      name: logo.name,
      altText: logo.altText,
      logo: this.present.media(logo.logo),
    }));
  }
}
