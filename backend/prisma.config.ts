import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: { path: 'prisma/migrations' },
  datasource: {
    // Migrations can't run through the transaction pooler. `prisma generate` needs no real URL.
    url: process.env.DIRECT_URL || 'postgresql://unset:unset@localhost:5432/unset',
  },
});
