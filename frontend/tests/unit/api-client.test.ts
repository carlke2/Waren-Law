import { z } from 'zod';
import { ApiError, apiFetch, apiFetchOrNull } from '@/lib/api/client';

const schema = z.object({ ok: z.boolean() });
const json = (status: number, body: unknown = { ok: true }) =>
  new Response(JSON.stringify(body), { status });

describe('apiFetch', () => {
  beforeEach(() => {
    vi.stubEnv('API_URL', 'http://api.test');
    vi.stubEnv('REVALIDATE_SECONDS', '300');
    vi.stubEnv('SITE_URL', 'http://site.test');
    vi.stubEnv('REDIRECT_CACHE_SECONDS', '300');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('returns validated data without retrying on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue(json(200));
    vi.stubGlobal('fetch', fetchMock);
    await expect(apiFetch('x', schema)).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('retries once after a server error', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(json(500)).mockResolvedValue(json(200));
    vi.stubGlobal('fetch', fetchMock);
    await expect(apiFetch('x', schema)).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[1]?.signal).toBeUndefined();
    expect(fetchMock.mock.calls[1]?.[1]?.signal).toBeInstanceOf(AbortSignal);
  });

  it('retries once after a network failure', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('dns')).mockResolvedValue(json(200));
    vi.stubGlobal('fetch', fetchMock);
    await expect(apiFetch('x', schema)).resolves.toEqual({ ok: true });
  });

  it('reports the failure when the retry also fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(async () => json(503)),
    );
    await expect(apiFetch('x', schema)).rejects.toBeInstanceOf(ApiError);
  });

  it('does not retry a 404, and turns it into null', async () => {
    const fetchMock = vi.fn().mockImplementation(async () => json(404));
    vi.stubGlobal('fetch', fetchMock);
    await expect(apiFetchOrNull('x', schema)).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
