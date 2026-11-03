import { Controller, Get, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { HEALTH_PATH, type HealthResponse } from '@waren/shared';
import type { Response } from 'express';
import { HealthService } from './health.service.js';

@Controller(HEALTH_PATH)
@SkipThrottle()
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  async check(@Res({ passthrough: true }) response: Response): Promise<HealthResponse> {
    const up = await this.health.isDatabaseUp();
    response.status(up ? 200 : 503).setHeader('Cache-Control', 'no-store');
    return up ? { status: 'ok', database: 'up' } : { status: 'error', database: 'down' };
  }
}
