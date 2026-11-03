import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RATE_LIMIT_WINDOW_MS } from '@waren/shared';
import { JsonExceptionFilter } from './common/http-exception.filter.js';
import { RequestLoggerMiddleware } from './common/request-logger.middleware.js';
import { ZodValidationPipe } from './common/zod-validation.pipe.js';
import { ConfigModule, ENV, type Env } from './config/config.module.js';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './modules/health/health.module.js';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      inject: [ENV],
      useFactory: (env: Env) => [{ ttl: RATE_LIMIT_WINDOW_MS, limit: env.RATE_LIMIT_PER_MINUTE }],
    }),
    HealthModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    { provide: APP_FILTER, useClass: JsonExceptionFilter },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*splat');
  }
}
