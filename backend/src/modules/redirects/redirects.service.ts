import { Injectable, NotFoundException } from '@nestjs/common';
import type { RedirectResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class RedirectsService {
  constructor(private readonly prisma: PrismaService) {}

  async lookup(path: string): Promise<RedirectResponse> {
    const redirect = await this.prisma.redirect.findUnique({ where: { fromPath: path } });
    if (!redirect) throw new NotFoundException(`No redirect for "${path}"`);
    return {
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
      statusCode: redirect.statusCode,
    };
  }
}
