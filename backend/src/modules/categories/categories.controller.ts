import { Get } from '@nestjs/common';
import { API_ROUTES } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { CategoriesService } from './categories.service.js';

@PublicApiController(API_ROUTES.categories)
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list() {
    return this.categories.list();
  }
}
