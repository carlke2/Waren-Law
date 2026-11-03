import { Get, Param, Query } from '@nestjs/common';
import { API_ROUTES, insightListQuerySchema } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { InsightsService } from './insights.service.js';

class InsightListQuery extends zodDto(insightListQuerySchema) {}

@PublicApiController(API_ROUTES.insights)
export class InsightsController {
  constructor(private readonly insights: InsightsService) {}

  @Get()
  list(@Query() query: InsightListQuery) {
    return this.insights.list(query);
  }

  @Get(':slug')
  bySlug(@Param() params: SlugParams) {
    return this.insights.bySlug(params.slug);
  }
}
