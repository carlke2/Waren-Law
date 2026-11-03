import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { SettingsService } from './settings.service.js';

@PublicApiController(API_ROUTES.settings)
export class SettingsController {
  constructor(private readonly settings: SettingsService) {}

  @Get()
  all() {
    return this.settings.all();
  }
}
