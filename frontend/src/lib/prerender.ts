import { connection } from 'next/server';
import { serverEnv } from './env';

export async function deferToRequestWhenPrerenderIsSkipped(): Promise<void> {
  if (serverEnv().skipPrerender) await connection();
}

export async function staticParams<T>(load: () => Promise<T[]>): Promise<T[]> {
  return serverEnv().skipPrerender ? [] : load();
}
