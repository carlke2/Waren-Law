import { apiFetch } from './client';

export interface BackendHealth {
  status: 'ok' | 'error';
  database: 'up' | 'down';
}

export async function getBackendHealth(): Promise<BackendHealth | null> {
  try {
    return await apiFetch<BackendHealth>('/health', { cache: 'no-store' });
  } catch {
    return null;
  }
}
