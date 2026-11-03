import { execFileSync } from 'node:child_process';
import { config } from 'dotenv';

export default function migrateTestDatabase(): void {
  config({ quiet: true });
  const testDatabaseUrl = process.env.TEST_DATABASE_URL;
  if (!testDatabaseUrl || new URL(testDatabaseUrl).pathname !== '/waren_test') {
    throw new Error('TEST_DATABASE_URL must point to a local database named waren_test');
  }
  execFileSync('prisma', ['migrate', 'deploy'], {
    env: { ...process.env, DIRECT_URL: testDatabaseUrl },
    stdio: 'ignore',
  });
}
