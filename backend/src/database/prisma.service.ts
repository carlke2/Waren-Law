import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { ENV, type Env } from '../config/config.module.js';
import { databaseSslOptions } from './database-ssl.js';
import { PrismaClient } from '../../prisma/generated/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(ENV) env: Env) {
    super({
      adapter: new PrismaPg({
        connectionString: env.DATABASE_URL,
        ssl: databaseSslOptions(env),
        // Reconnecting after a quiet spell is slow, so idle connections stay open for a while.
        idleTimeoutMillis: env.DATABASE_POOL_IDLE_TIMEOUT_MS,
        keepAlive: true,
        // Without these limits, a silently dropped connection hung a request for over 3 minutes.
        connectionTimeoutMillis: env.DATABASE_CONNECT_TIMEOUT_MS,
        query_timeout: env.DATABASE_QUERY_TIMEOUT_MS,
      }),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
