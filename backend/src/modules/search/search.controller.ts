import { Get, Query } from '@nestjs/common';
import { API_ROUTES, searchQuerySchema } from '@waren/shared';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { SearchService } from './search.service.js';

class SearchQuery extends zodDto(searchQuerySchema) {}

@PublicApiController(API_ROUTES.search)
export class SearchController {
  constructor(private readonly searcher: SearchService) {}

  @Get()
  search(@Query() query: SearchQuery) {
    return this.searcher.search(query.q);
  }
}
