import { createHash, timingSafeEqual } from 'node:crypto';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { LEADS_API_KEY_HEADER } from '@waren/shared';
import type { Request } from 'express';
import { ENV, type Env } from '../../config/config.module.js';

const digest = (value: string) => createHash('sha256').update(value).digest();

// Leads hold personal data. Until admin sign-in exists, no configured key means no access at all.
@Injectable()
export class LeadsApiKeyGuard implements CanActivate {
  constructor(@Inject(ENV) private readonly env: Env) {}

  canActivate(context: ExecutionContext): boolean {
    const expected = this.env.LEADS_API_KEY;
    const provided = context.switchToHttp().getRequest<Request>().headers[LEADS_API_KEY_HEADER];
    if (!expected || typeof provided !== 'string') return false;
    return timingSafeEqual(digest(provided), digest(expected));
  }
}
