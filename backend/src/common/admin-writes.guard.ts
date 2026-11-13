import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { API_PREFIX, API_ROUTES } from '@waren/shared';
import type { Request } from 'express';
import { ENV, type Env } from '../config/config.module.js';

const ADMIN_PATH = `/${API_PREFIX}/${API_ROUTES.admin}`;
const READ_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

export function isAdminWrite(method: string, path: string): boolean {
  const isAdminPath = path === ADMIN_PATH || path.startsWith(`${ADMIN_PATH}/`);
  return isAdminPath && !READ_METHODS.has(method.toUpperCase());
}

@Injectable()
export class AdminWritesGuard implements CanActivate {
  constructor(@Inject(ENV) private readonly env: Env) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    if (this.env.ADMIN_WRITES_ALLOWED || !isAdminWrite(request.method, request.path)) return true;
    throw new ForbiddenException('Admin changes are switched off on this server.');
  }
}
