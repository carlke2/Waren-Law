import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ENV, type Env } from './config/config.module.js';

/** Shared by `main.ts` and the e2e tests, so tests run against the real HTTP configuration. */
export function configureApp(app: NestExpressApplication): void {
  const env = app.get<Env>(ENV);
  // Nginx sits in front in production; rate limiting needs the real client address.
  if (env.NODE_ENV === 'production') app.set('trust proxy', 1);
  app.use(helmet());
  app.enableCors({ origin: env.FRONTEND_URL, credentials: true });
  app.enableShutdownHooks();
}
