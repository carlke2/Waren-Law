import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client.js';

describe('row level security', () => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('is enabled on every table, so a new table cannot be exposed by accident', async () => {
    const tables = await prisma.$queryRaw<{ tablename: string }[]>`
      SELECT tablename FROM pg_tables
      WHERE schemaname = 'public' AND rowsecurity = false AND tablename <> '_prisma_migrations'`;
    expect(tables).toEqual([]);
  });
});
