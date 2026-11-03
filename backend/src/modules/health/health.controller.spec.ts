import type { Response } from 'express';
import { HealthController } from './health.controller.js';
import type { HealthService } from './health.service.js';

function fakeResponse() {
  const response = { status: vi.fn(), setHeader: vi.fn() };
  response.status.mockReturnValue(response);
  return response;
}

describe('HealthController', () => {
  it('reports ok when the database responds', async () => {
    const controller = new HealthController({
      isDatabaseUp: async () => true,
    } as unknown as HealthService);
    const response = fakeResponse();
    await expect(controller.check(response as unknown as Response)).resolves.toEqual({
      status: 'ok',
      database: 'up',
    });
    expect(response.status).toHaveBeenCalledWith(200);
  });

  it('returns 503 when the database is down', async () => {
    const controller = new HealthController({
      isDatabaseUp: async () => false,
    } as unknown as HealthService);
    const response = fakeResponse();
    await expect(controller.check(response as unknown as Response)).resolves.toEqual({
      status: 'error',
      database: 'down',
    });
    expect(response.status).toHaveBeenCalledWith(503);
  });
});
