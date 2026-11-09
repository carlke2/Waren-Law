import { loadRootContent } from '@/lib/utils/content/root-content';
import * as api from '@/lib/api/content';

vi.mock('@/lib/api/content');

const mocked = vi.mocked(api);

describe('loadRootContent', () => {
  beforeEach(() => vi.resetAllMocks());

  it('never serves the home record at /home/', async () => {
    await expect(loadRootContent('home')).resolves.toBeNull();
    expect(mocked.resolveRootSlug).not.toHaveBeenCalled();
  });

  it('skips the API for a slug that cannot exist', async () => {
    await expect(loadRootContent('Bad_Slug')).resolves.toBeNull();
    expect(mocked.resolveRootSlug).not.toHaveBeenCalled();
  });

  it('returns null when nothing is at the slug', async () => {
    mocked.resolveRootSlug.mockResolvedValue(null);
    await expect(loadRootContent('missing')).resolves.toBeNull();
  });

  it.each([
    ['page', 'getPage'],
    ['practice_area', 'getPracticeArea'],
    ['insight', 'getInsight'],
    ['webinar', 'getWebinar'],
  ] as const)('loads a %s with %s', async (type, loader) => {
    mocked.resolveRootSlug.mockResolvedValue({ type, slug: 'x' });
    const content = { slug: 'x' };
    (mocked[loader] as unknown as { mockResolvedValue: (v: unknown) => void }).mockResolvedValue(
      content,
    );
    await expect(loadRootContent('x')).resolves.toEqual({ type, content });
  });

  it('returns null if the record disappears after resolving', async () => {
    mocked.resolveRootSlug.mockResolvedValue({ type: 'insight', slug: 'x' });
    mocked.getInsight.mockResolvedValue(null);
    await expect(loadRootContent('x')).resolves.toBeNull();
  });
});
