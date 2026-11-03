import { z } from 'zod';

const envSchema = z.object({
  API_URL: z.url(),
  REVALIDATE_SECONDS: z.coerce.number().int().positive(),
  SKIP_PRERENDER: z.enum(['true', 'false']).default('false'),
});

export function serverEnv() {
  const env = envSchema.parse(process.env);
  return {
    apiUrl: env.API_URL.replace(/\/$/, ''),
    revalidateSeconds: env.REVALIDATE_SECONDS,
    skipPrerender: env.SKIP_PRERENDER === 'true',
  };
}
