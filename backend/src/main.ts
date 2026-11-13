import 'reflect-metadata';
import 'dotenv/config';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';
import { configureApp } from './app.setup.js';
import { ENV, type Env } from './config/config.module.js';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  configureApp(app);
  const env = app.get<Env>(ENV);
  if (env.ADMIN_WRITES_ALLOWED)
    Logger.warn('Admin writes are ON. Use this only with the development database.');
  await app.listen(env.PORT);
}

await bootstrap();
