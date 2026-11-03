import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { OfficesService } from './offices.service.js';

@PublicApiController(API_ROUTES.offices)
export class OfficesController {
  constructor(private readonly offices: OfficesService) {}

  @Get()
  list() {
    return this.offices.list();
  }
}
