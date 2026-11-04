import { z } from 'zod';

const optionalString = z
  .string()
  .optional()
  .transform((value) => (value === '' ? undefined : value));

const postgresUrl = z.url({ protocol: /^postgres(ql)?$/ });

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: postgresUrl,
  DIRECT_URL: postgresUrl,
  DATABASE_SSL: z.enum(['disable', 'require', 'verify']).default('require'),
  DATABASE_SSL_CA_PATH: optionalString,
  DATABASE_POOL_IDLE_TIMEOUT_MS: z.coerce.number().int().nonnegative().default(120_000),
  DATABASE_POOL_MIN: z.coerce.number().int().min(0).default(4),
  DATABASE_CONNECT_TIMEOUT_MS: z.coerce.number().int().positive().default(10_000),
  DATABASE_QUERY_TIMEOUT_MS: z.coerce.number().int().positive().default(15_000),
  FRONTEND_URL: z.url(),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(300),
  CONTACT_RATE_LIMIT_PER_HOUR: z.coerce.number().int().positive().default(5),
  NEWSLETTER_RATE_LIMIT_PER_HOUR: z.coerce.number().int().positive().default(5),
  CONTACT_RETENTION_MONTHS: z.coerce.number().int().positive().default(12),
  CONTACT_RETENTION_INTERVAL_HOURS: z.coerce.number().positive().default(24),
  // Empty means the leads API refuses every request.
  LEADS_API_KEY: optionalString,
  UPLOADS_DIR: z.string().min(1),
  PREVIEW_UNREVIEWED_PAGES: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  PUBLIC_MEDIA_BASE_URL: z.url(),
  SMTP_HOST: optionalString,
  SMTP_PORT: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.number().int().min(1).max(65535).optional(),
  ),
  SMTP_USER: optionalString,
  SMTP_PASSWORD: optionalString,
  SMTP_FROM: optionalString,
});

export type Env = z.output<typeof envSchema>;

export function parseEnv(source: Record<string, string | undefined>): Env {
  const result = envSchema.safeParse(source);
  if (!result.success) {
    const problems = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`Invalid environment configuration: ${problems}`);
  }
  return result.data;
}
