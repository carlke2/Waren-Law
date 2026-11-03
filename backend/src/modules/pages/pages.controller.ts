import { Get, Param } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { PagesService } from './pages.service.js';

@PublicApiController(API_ROUTES.pages)
export class PagesController {
  constructor(private readonly pages: PagesService) {}

  @Get(':slug')
  bySlug(@Param() params: SlugParams) {
    return this.pages.bySlug(params.slug);
  }
}
