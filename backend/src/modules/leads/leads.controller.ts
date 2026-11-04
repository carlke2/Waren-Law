import { Controller, Get, Header, Query, UseGuards } from '@nestjs/common';
import { API_PREFIX, API_ROUTES, LEADS_PATHS, leadListQuerySchema } from '@waren/shared';
import { zodDto } from '../../common/zod-validation.pipe.js';
import { LeadsApiKeyGuard } from './leads-api-key.guard.js';
import { LeadsService } from './leads.service.js';

class LeadQuery extends zodDto(leadListQuerySchema) {}

@Controller(`${API_PREFIX}/${API_ROUTES.leads}`)
@UseGuards(LeadsApiKeyGuard)
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Get()
  list(@Query() query: LeadQuery) {
    return this.leads.list(query);
  }

  @Get(LEADS_PATHS.export)
  @Header('Content-Type', 'text/csv; charset=utf-8')
  @Header('Content-Disposition', `attachment; filename="${LEADS_PATHS.export}"`)
  csv(@Query() query: LeadQuery) {
    return this.leads.csv(query);
  }

  @Get(LEADS_PATHS.summary)
  summary(@Query() query: LeadQuery) {
    return this.leads.summary(query);
  }
}
