import { Get, Param } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { ResolveService } from './resolve.service.js';

@PublicApiController(API_ROUTES.resolve)
export class ResolveController {
  constructor(private readonly resolver: ResolveService) {}

  @Get()
  list() {
    return this.resolver.listRootSlugs();
  }

  @Get(':slug')
  resolve(@Param() params: SlugParams) {
    return this.resolver.resolve(params.slug);
  }
}
