import { readFileSync } from 'node:fs';
import type { ConnectionOptions } from 'node:tls';
import type { Env } from '../config/env.schema.js';

type SslSettings = Pick<Env, 'DATABASE_SSL' | 'DATABASE_SSL_CA_PATH'>;

export function databaseSslOptions(settings: SslSettings): ConnectionOptions | false {
  switch (settings.DATABASE_SSL) {
    case 'disable':
      return false;
    case 'require':
      // Encrypts the connection but can't verify the server until Supabase's CA file is supplied.
      return { rejectUnauthorized: false };
    case 'verify':
      if (!settings.DATABASE_SSL_CA_PATH) {
        throw new Error('DATABASE_SSL=verify needs DATABASE_SSL_CA_PATH');
      }
      return { rejectUnauthorized: true, ca: readFileSync(settings.DATABASE_SSL_CA_PATH, 'utf8') };
  }
}
