import { ConflictException, Injectable } from '@nestjs/common';
import { claimSlug, SlugConflictError, type SlugClaim } from '../../database/slug-registry.js';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class SlugRegistryService {
  constructor(private readonly prisma: PrismaService) {}

  async claim(claim: SlugClaim): Promise<void> {
    try {
      await claimSlug(this.prisma, claim);
    } catch (error) {
      if (error instanceof SlugConflictError) throw new ConflictException(error.message);
      throw error;
    }
  }

  async release(claim: Omit<SlugClaim, 'slug'>): Promise<void> {
    await this.prisma.slug.deleteMany({ where: claim });
  }
}
