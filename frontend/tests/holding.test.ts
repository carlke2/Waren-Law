import { ROUTES } from '@waren/shared';
import { holdingTitle } from '@/lib/content/holding';
import { dictionary } from '@/lib/dictionary';

const fetchMock = vi.fn();

function respondWith(body: unknown, status = 200) {
  fetchMock.mockResolvedValueOnce(new Response(JSON.stringify(body), { status }));
}

const segments = (route: string) => route.split('/').filter(Boolean);

describe('holdingTitle', () => {
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
    vi.stubEnv('API_URL', 'http://api.test');
    vi.stubEnv('REVALIDATE_SECONDS', '60');
    vi.stubEnv('SITE_URL', 'http://site.test');
    vi.stubEnv('REDIRECT_CACHE_SECONDS', '60');
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it('uses the nav label for a fixed route, without calling the API', async () => {
    await expect(holdingTitle(segments(ROUTES.search))).resolves.toBe(dictionary.nav.search);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('answers null for a path with too many segments', async () => {
    await expect(holdingTitle(['a', 'b', 'c'])).resolves.toBeNull();
  });

  it('answers null for an unknown root slug', async () => {
    respondWith({}, 404);
    await expect(holdingTitle(['nothing-here'])).resolves.toBeNull();
  });

  it('answers null for an unknown second-level section', async () => {
    await expect(holdingTitle(['about-us', 'extra'])).resolves.toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
