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

export async function apiFetch<T extends z.ZodType>(path: string, schema: T): Promise<z.output<T>> {
  const { apiUrl, revalidateSeconds } = serverEnv();
  const response = await fetch(`${apiUrl}/${API_PREFIX}/${path}`, {
    headers: { Accept: 'application/json' },
    next: { revalidate: revalidateSeconds },
  });
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
