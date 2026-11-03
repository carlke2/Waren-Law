import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { ClientLogosService } from './client-logos.service.js';

@PublicApiController(API_ROUTES.clientLogos)
export class ClientLogosController {
  constructor(private readonly clientLogos: ClientLogosService) {}

  @Get()
  list() {
    return this.clientLogos.listPermitted();
  }
}
