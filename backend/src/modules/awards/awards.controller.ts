import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { AwardsService } from './awards.service.js';

@PublicApiController(API_ROUTES.awards)
export class AwardsController {
  constructor(private readonly awards: AwardsService) {}

  @Get()
  list() {
    return this.awards.list();
  }
}
