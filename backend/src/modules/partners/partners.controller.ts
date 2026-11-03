import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { PartnersService } from './partners.service.js';

@PublicApiController(API_ROUTES.partners)
export class PartnersController {
  constructor(private readonly partners: PartnersService) {}

  @Get()
  list() {
    return this.partners.list();
  }
}
