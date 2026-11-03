import { Injectable } from '@nestjs/common';
import type { AwardResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';
import { PUBLISHED } from '../content/visibility.js';

@Injectable()
export class AwardsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async list(): Promise<AwardResponse[]> {
    const awards = await this.prisma.award.findMany({
      where: { ...PUBLISHED, visible: true },
      include: { image: true },
      orderBy: [{ year: 'desc' }, { slug: 'asc' }],
    });
    return awards.map((award) => ({
      slug: award.slug,
      name: award.name,
      awarder: award.awarder,
      year: award.year,
      category: award.category,
      image: this.present.optionalMedia(award.image),
    }));
  }
}
