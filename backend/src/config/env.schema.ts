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
  FRONTEND_URL: z.url(),
  SESSION_SECRET: z.string().min(32, 'SESSION_SECRET must be at least 32 characters'),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().positive().default(300),
  UPLOADS_DIR: z.string().min(1),
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
