import { Controller, Get, Res } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import type { Response } from 'express';
import { HealthService } from './health.service.js';

@Controller('health')
@SkipThrottle()
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get()
  async check(@Res({ passthrough: true }) response: Response) {
    const up = await this.health.isDatabaseUp();
    response.status(up ? 200 : 503).setHeader('Cache-Control', 'no-store');
    return { status: up ? 'ok' : 'error', database: up ? 'up' : 'down' };
  }
}
