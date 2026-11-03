import {
  applyDecorators,
  CallHandler,
  Controller,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { API_PREFIX, PUBLIC_CACHE_CONTROL } from '@waren/shared';
import type { Response } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class PublicCacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const response = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(tap(() => response.setHeader('Cache-Control', PUBLIC_CACHE_CONTROL)));
  }
}

export function PublicApiController(route: string): ClassDecorator {
  return applyDecorators(
    Controller(`${API_PREFIX}/${route}`),
    UseInterceptors(PublicCacheInterceptor),
  );
}
