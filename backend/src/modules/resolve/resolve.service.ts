import { Injectable, NotFoundException } from '@nestjs/common';
import type { ResolveResponse } from '@waren/shared';
import type { SlugType } from '../../../prisma/generated/client.js';
import { PrismaService } from '../../database/prisma.service.js';
import { PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class ResolveService {
  constructor(private readonly prisma: PrismaService) {}

  private isVisible(type: SlugType, id: string): Promise<number> {
    const where = { id, ...PUBLISHED_AND_APPROVED };
    switch (type) {
      case 'page':
        return this.prisma.page.count({ where });
      case 'practice_area':
        return this.prisma.practiceArea.count({ where });
      case 'insight':
        return this.prisma.insight.count({ where });
      case 'webinar':
        return this.prisma.webinar.count({ where });
    }
  }

  async resolve(slug: string): Promise<ResolveResponse> {
    const entry = await this.prisma.slug.findUnique({ where: { slug } });
    if (!entry || !(await this.isVisible(entry.type, entry.entityId))) {
      throw new NotFoundException(`Nothing found at "${slug}"`);
    }
    return { type: entry.type, slug: entry.slug };
  }
}
