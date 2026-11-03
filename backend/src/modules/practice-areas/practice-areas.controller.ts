import { Get, Param } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { PracticeAreasService } from './practice-areas.service.js';

@PublicApiController(API_ROUTES.practiceAreas)
export class PracticeAreasController {
  constructor(private readonly practiceAreas: PracticeAreasService) {}

  @Get()
  list() {
    return this.practiceAreas.list();
  }

  @Get(':slug')
  bySlug(@Param() params: SlugParams) {
    return this.practiceAreas.bySlug(params.slug);
  }
}
