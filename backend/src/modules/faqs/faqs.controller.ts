import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { FaqsService } from './faqs.service.js';

@PublicApiController(API_ROUTES.faqs)
export class FaqsController {
  constructor(private readonly faqs: FaqsService) {}

  @Get()
  list() {
    return this.faqs.list();
  }
}
