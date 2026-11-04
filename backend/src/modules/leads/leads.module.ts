import { Module } from '@nestjs/common';
import { LeadsApiKeyGuard } from './leads-api-key.guard.js';
import { LeadsController } from './leads.controller.js';
import { LeadsService } from './leads.service.js';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, LeadsApiKeyGuard],
})
export class LeadsModule {}
