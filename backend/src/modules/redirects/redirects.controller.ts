import { Get, Query } from '@nestjs/common';
import { API_ROUTES, redirectQuerySchema } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { RedirectsService } from './redirects.service.js';

class RedirectQuery extends zodDto(redirectQuerySchema) {}

@PublicApiController(API_ROUTES.redirects)
export class RedirectsController {
  constructor(private readonly redirects: RedirectsService) {}

  @Get()
  lookup(@Query() query: RedirectQuery) {
    return this.redirects.lookup(query.path);
  }
}
