import { Get, Param, Query } from '@nestjs/common';
import { API_ROUTES, teamListQuerySchema } from '@waren/shared';
import { SlugParams } from '../../common/api-dtos.js';
import { PublicApiController } from '../../common/public-api.decorator.js';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { TeamService } from './team.service.js';

class TeamListQuery extends zodDto(teamListQuerySchema) {}

@PublicApiController(API_ROUTES.team)
export class TeamController {
  constructor(private readonly team: TeamService) {}

  @Get()
  list(@Query() query: TeamListQuery) {
    return this.team.list(query.practiceArea);
  }

  @Get(':slug')
  bySlug(@Param() params: SlugParams) {
    return this.team.bySlug(params.slug);
  }
}
