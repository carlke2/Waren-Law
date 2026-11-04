import 'reflect-metadata';
import { config } from 'dotenv';

config({ quiet: true });

const testDatabaseUrl = process.env.TEST_DATABASE_URL;
if (!testDatabaseUrl || new URL(testDatabaseUrl).pathname !== '/waren_test') {
  // Tests write fixtures, so they must never reach the Supabase database.
  throw new Error('TEST_DATABASE_URL must point to a local database named waren_test');
}

process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = testDatabaseUrl;
process.env.DIRECT_URL = testDatabaseUrl;
process.env.DATABASE_SSL = 'disable';
delete process.env.PREVIEW_UNREVIEWED_PAGES;
process.env.FRONTEND_URL = 'http://localhost:3000';
process.env.SESSION_SECRET = 'test-secret-test-secret-test-secret-00';
process.env.RATE_LIMIT_PER_MINUTE = '100000';
process.env.CONTACT_RATE_LIMIT_PER_HOUR = '100000';
process.env.NEWSLETTER_RATE_LIMIT_PER_HOUR = '100000';
process.env.UPLOADS_DIR = 'uploads';
process.env.PUBLIC_MEDIA_BASE_URL = 'http://localhost:4000/uploads';
