import type { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { NestExpressApplication } from '@nestjs/platform-express';
import request from 'supertest';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/app.setup.js';

describe('GET /health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] }).compile();
    const nest = moduleRef.createNestApplication<NestExpressApplication>({ logger: false });
    configureApp(nest);
    await nest.init();
    app = nest;
  });

  afterAll(async () => {
    await app.close();
  });

  it('reports the database as up', async () => {
    const response = await request(app.getHttpServer()).get('/health').expect(200);
    expect(response.body).toEqual({ status: 'ok', database: 'up' });
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });

  it('allows only the configured frontend origin', async () => {
    const response = await request(app.getHttpServer())
      .get('/health')
      .set('Origin', 'https://evil.example');
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('returns unknown routes as JSON errors', async () => {
    const response = await request(app.getHttpServer()).get('/does-not-exist').expect(404);
    expect(response.body).toMatchObject({
      statusCode: 404,
      error: 'Not Found',
      path: '/does-not-exist',
    });
  });
});
