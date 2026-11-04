import path from 'node:path';
import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

const scriptRoot = path.resolve(import.meta.dirname, '..');
const backendRoot = path.resolve(scriptRoot, '../../backend');

loadEnv({ path: path.join(scriptRoot, '.env'), quiet: true });
loadEnv({ path: path.join(backendRoot, '.env'), quiet: true });

const envSchema = z.object({
  WP_BASE_URL: z.url(),
  WP_REQUEST_INTERVAL_MS: z.coerce.number().int().positive(),
  WP_CACHE_DIR: z.string().min(1),
  WP_USER_AGENT: z.string().min(1),
  URL_INVENTORY_PATH: z.string().min(1),
  DESIGN_ASSETS_DIR: z.string().min(1).default('../../docs/design/assets'),
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
  DATABASE_SSL: z.enum(['disable', 'require', 'verify']).default('require'),
  DATABASE_SSL_CA_PATH: z.string().optional(),
  UPLOADS_DIR: z.string().min(1),
});

const env = envSchema.parse(process.env);

export const config = {
  baseUrl: env.WP_BASE_URL.replace(/\/$/, ''),
  requestIntervalMs: env.WP_REQUEST_INTERVAL_MS,
  userAgent: env.WP_USER_AGENT,
  cacheDir: path.resolve(scriptRoot, env.WP_CACHE_DIR),
  urlInventoryPath: path.resolve(scriptRoot, env.URL_INVENTORY_PATH),
  designAssetsDir: path.resolve(scriptRoot, env.DESIGN_ASSETS_DIR),
  uploadsDir: path.resolve(backendRoot, env.UPLOADS_DIR),
  databaseUrl: env.DATABASE_URL,
  databaseSsl: {
    DATABASE_SSL: env.DATABASE_SSL,
    DATABASE_SSL_CA_PATH: env.DATABASE_SSL_CA_PATH || undefined,
  },
};
