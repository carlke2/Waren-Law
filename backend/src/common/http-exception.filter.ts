import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { Request, Response } from 'express';
import { STATUS_CODES } from 'node:http';

// Prisma leaves the message empty for driver failures: the cause is only in these fields.
function databaseFailure(exception: unknown): string {
  const { code, meta } = exception as { code?: unknown; meta?: unknown };
  return code ? `[${String(code)}] ${JSON.stringify(meta ?? {})}` : '';
}

@Catch()
export class JsonExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('Exception');

  catch(exception: unknown, host: ArgumentsHost): void {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    let statusCode = 500;
    let message = 'Internal server error';
    let details: unknown;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else {
        const parsed = body as { message?: unknown; details?: unknown };
        if (typeof parsed.message === 'string') message = parsed.message;
        else if (Array.isArray(parsed.message)) message = parsed.message.join('; ');
        details = parsed.details;
      }
    } else {
      this.logger.error(
        `${request.method} ${request.path} ${databaseFailure(exception)}`.trimEnd(),
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    response.status(statusCode).json({
      statusCode,
      error: STATUS_CODES[statusCode] ?? 'Error',
      message,
      ...(details === undefined ? {} : { details }),
      path: request.path,
      timestamp: new Date().toISOString(),
    });
  }
}
