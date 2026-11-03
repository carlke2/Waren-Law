import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RATE_LIMIT_WINDOW_MS } from '@waren/shared';
import { JsonExceptionFilter } from './common/http-exception.filter.js';
import { RequestLoggerMiddleware } from './common/request-logger.middleware.js';
import { ZodValidationPipe } from './common/zod-validation.pipe.js';
import { ConfigModule, ENV, type Env } from './config/config.module.js';
import { DatabaseModule } from './database/database.module.js';
import { ContentModule } from './modules/content/content.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { SettingsModule } from './modules/settings/settings.module.js';
import { OfficesModule } from './modules/offices/offices.module.js';
import { PagesModule } from './modules/pages/pages.module.js';
import { PracticeAreasModule } from './modules/practice-areas/practice-areas.module.js';
import { TeamModule } from './modules/team/team.module.js';
import { InsightsModule } from './modules/insights/insights.module.js';
import { CategoriesModule } from './modules/categories/categories.module.js';
import { WebinarsModule } from './modules/webinars/webinars.module.js';
import { PartnersModule } from './modules/partners/partners.module.js';
import { AwardsModule } from './modules/awards/awards.module.js';
import { ClientLogosModule } from './modules/client-logos/client-logos.module.js';
import { TestimonialsModule } from './modules/testimonials/testimonials.module.js';
import { ResolveModule } from './modules/resolve/resolve.module.js';
import { SearchModule } from './modules/search/search.module.js';
import { RedirectsModule } from './modules/redirects/redirects.module.js';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ThrottlerModule.forRootAsync({
      inject: [ENV],
      useFactory: (env: Env) => [{ ttl: RATE_LIMIT_WINDOW_MS, limit: env.RATE_LIMIT_PER_MINUTE }],
    }),
    ContentModule,
    HealthModule,
    SettingsModule,
    OfficesModule,
    PagesModule,
    PracticeAreasModule,
    TeamModule,
    InsightsModule,
    CategoriesModule,
    WebinarsModule,
    PartnersModule,
    AwardsModule,
    ClientLogosModule,
    TestimonialsModule,
    ResolveModule,
    SearchModule,
    RedirectsModule,
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
