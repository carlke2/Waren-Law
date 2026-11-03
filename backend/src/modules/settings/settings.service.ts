import { Injectable } from '@nestjs/common';
import type { SettingsResponse } from '@waren/shared';
import { PrismaService } from '../../database/prisma.service.js';
import { ContentPresenter } from '../content/content-presenter.service.js';

@Injectable()
export class SettingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly present: ContentPresenter,
  ) {}

  async all(): Promise<SettingsResponse> {
    const settings = await this.prisma.setting.findMany({ include: { media: true } });
    return Object.fromEntries(
      settings.map(({ key, value, media }) => [
        key,
        media ? { ...(value as object), media: this.present.media(media) } : value,
      ]),
    );
  }
}
