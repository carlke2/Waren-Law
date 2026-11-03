import { Injectable } from '@nestjs/common';
import type { SettingsResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async all(): Promise<SettingsResponse> {
    const settings = await this.prisma.setting.findMany();
    return Object.fromEntries(settings.map(({ key, value }) => [key, value]));
  }
}
