import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { HomeHeroVideo } from '@/components/site/home/home-hero-video';
import { dictionary } from '@/lib/utils/dictionary';

const CLIP = 'https://media.test/hero.mp4';
const POSTER = '/home/poster.webp';

function stubBrowser({ motion, saveData = false }: { motion: boolean; saveData?: boolean }) {
  vi.stubGlobal('matchMedia', () => ({
    matches: motion,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal('requestIdleCallback', (run: () => void) => setTimeout(run));
  vi.stubGlobal('cancelIdleCallback', (id: number) => clearTimeout(id));
  Object.defineProperty(navigator, 'connection', { value: { saveData }, configurable: true });
}

async function renderIdle() {
  const view = render(<HomeHeroVideo url={CLIP} poster={POSTER} />);
  await act(() => vi.runAllTimersAsync());
  return view;
}

describe('HomeHeroVideo', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('adds a muted looping video with the poster once the page is idle', async () => {
    stubBrowser({ motion: true });
    const { container } = render(<HomeHeroVideo url={CLIP} poster={POSTER} />);
    expect(container.querySelector('video')).toBeNull();
    await act(() => vi.runAllTimersAsync());
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', CLIP);
    expect(video).toHaveAttribute('poster', POSTER);
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(video?.muted).toBe(true);
    expect(video).toHaveAttribute('loop');
  });

  it('pauses and resumes from the keyboard', async () => {
    stubBrowser({ motion: true });
    const { container } = await renderIdle();
    const video = container.querySelector('video');
    if (!video) throw new Error('No video rendered');
    video.pause = () => fireEvent.pause(video);
    video.play = () => {
      fireEvent.play(video);
      return Promise.resolve();
    };
    const control = screen.getByRole('button', { name: dictionary.home.pauseVideo });
    control.focus();
    fireEvent.keyDown(control, { key: 'Enter' });
    fireEvent.click(control);
    fireEvent.click(screen.getByRole('button', { name: dictionary.home.playVideo }));
    expect(screen.getByRole('button', { name: dictionary.home.pauseVideo })).toBeInTheDocument();
  });

  it('keeps the poster alone when motion is reduced', async () => {
    stubBrowser({ motion: false });
    const { container } = await renderIdle();
    expect(container.querySelector('video')).toBeNull();
  });
});
