import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { HomeService } from './home.service.js';

@PublicApiController(API_ROUTES.home)
export class HomeController {
  constructor(private readonly home: HomeService) {}

  @Get()
  get() {
    return this.home.get();
  }
}
