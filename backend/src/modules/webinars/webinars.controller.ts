import { Get, Param, Query } from '@nestjs/common';
import { API_ROUTES, webinarListQuerySchema } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { WebinarsService } from './webinars.service.js';

class WebinarListQuery extends zodDto(webinarListQuerySchema) {}

@PublicApiController(API_ROUTES.webinars)
export class WebinarsController {
  constructor(private readonly webinars: WebinarsService) {}

  @Get()
  list(@Query() query: WebinarListQuery) {
    return this.webinars.list(query.state);
  }

  @Get(':slug')
  bySlug(@Param() params: SlugParams) {
    return this.webinars.bySlug(params.slug);
  }
}
