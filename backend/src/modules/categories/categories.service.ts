import { Injectable } from '@nestjs/common';
import type { CategoryResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { PUBLISHED, PUBLISHED_AND_APPROVED } from '../content/visibility.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<CategoryResponse[]> {
    const categories = await this.prisma.category.findMany({
      where: PUBLISHED,
      include: { _count: { select: { insights: { where: PUBLISHED_AND_APPROVED } } } },
      orderBy: { sortOrder: 'asc' },
    });
    return categories.map((category) => ({
      slug: category.slug,
      name: category.name,
      description: category.description,
      insightCount: category._count.insights,
    }));
  }
}
