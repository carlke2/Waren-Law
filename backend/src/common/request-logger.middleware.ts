import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

/** Logs method, path (never the query string, which may hold search terms), status and time. */
@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const started = performance.now();
    response.on('finish', () => {
      const elapsed = Math.round(performance.now() - started);
      this.logger.log(
        `${request.method} ${request.originalUrl.split('?')[0]} ${response.statusCode} ${elapsed}ms`,
      );
    });
    next();
  }
}
