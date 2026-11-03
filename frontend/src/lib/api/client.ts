import { API_PREFIX } from '@waren/shared';
import type { z } from 'zod';
import { serverEnv } from '@/lib/env';

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const NOT_FOUND = 404;

const SERVER_ERROR = 500;
const RETRY_DELAY_MS = 500;
const RETRY_TIMEOUT_MS = 20_000;

function request(url: string, revalidate: number, init?: RequestInit): Promise<Response> {
  return fetch(url, {
    headers: { Accept: 'application/json' },
    next: { revalidate },
    ...init,
  });
}

// One retry covers brief database or DNS failures, so a visitor doesn't get an error page.
async function requestWithRetry(url: string, revalidate: number): Promise<Response> {
  try {
    const response = await request(url, revalidate);
    if (response.status < SERVER_ERROR) return response;
  } catch {
    // Handled by the retry below, which reports the failure if it happens again.
  }
  await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
  // React returns the first result for identical fetches in a render. A signal opts out of that.
  return request(url, revalidate, { signal: AbortSignal.timeout(RETRY_TIMEOUT_MS) });
}

export async function apiFetch<T extends z.ZodType>(path: string, schema: T): Promise<z.output<T>> {
  const { apiUrl, revalidateSeconds } = serverEnv();
  const response = await requestWithRetry(`${apiUrl}/${API_PREFIX}/${path}`, revalidateSeconds);
  if (!response.ok) {
    throw new ApiError(`${path} returned ${response.status}`, response.status);
  }
  return schema.parse(await response.json());
}

export async function apiFetchOrNull<T extends z.ZodType>(
  path: string,
  schema: T,
): Promise<z.output<T> | null> {
  try {
    return await apiFetch(path, schema);
  } catch (error) {
    if (error instanceof ApiError && error.status === NOT_FOUND) return null;
    throw error;
  }
}
