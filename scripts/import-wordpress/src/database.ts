import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../backend/prisma/generated/client.js';
import { databaseSslOptions } from '../../../backend/src/database/database-ssl.js';
import { config } from './config.js';

export function createDatabase(): PrismaClient {
  return new PrismaClient({
    adapter: new PrismaPg({
      connectionString: config.databaseUrl,
      ssl: databaseSslOptions(config.databaseSsl),
    }),
  });
}

export type Database = PrismaClient;
