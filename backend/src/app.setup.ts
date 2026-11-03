import type { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import path from 'node:path';
import { ENV, type Env } from './config/config.module.js';

const MEDIA_CACHE_MAX_AGE = '30d';

export function configureApp(app: NestExpressApplication): void {
  const env = app.get<Env>(ENV);
  // Behind Nginx, rate limiting needs the real client address.
  if (env.NODE_ENV === 'production') app.set('trust proxy', 1);
  // The frontend is on another origin and must be able to load uploaded images.
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.useStaticAssets(path.resolve(env.UPLOADS_DIR), {
    prefix: new URL(env.PUBLIC_MEDIA_BASE_URL).pathname,
    maxAge: MEDIA_CACHE_MAX_AGE,
    index: false,
  });
  app.enableCors({ origin: env.FRONTEND_URL, credentials: true });
  app.enableShutdownHooks();
}
