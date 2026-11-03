import { HEALTH_PATH, healthResponseSchema, type HealthResponse } from '@waren/shared';
import { apiFetch } from './client';

export async function getBackendHealth(): Promise<HealthResponse | null> {
  try {
    return await apiFetch(`/${HEALTH_PATH}`, healthResponseSchema, { cache: 'no-store' });
  } catch {
    return null;
  }
}
