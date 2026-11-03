import 'reflect-metadata';
import { config } from 'dotenv';

config({ quiet: true });

process.env.NODE_ENV = 'test';
process.env.FRONTEND_URL ??= 'http://localhost:3000';
process.env.SESSION_SECRET ??= 'test-secret-test-secret-test-secret-00';
process.env.RATE_LIMIT_PER_MINUTE = '100000';

// Tests never touch the development database: they always use a database named waren_test.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set to run tests');
}
const url = new URL(process.env.DATABASE_URL);
url.pathname = '/waren_test';
process.env.DATABASE_URL = url.toString();
