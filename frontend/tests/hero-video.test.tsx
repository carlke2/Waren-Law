import { render } from '@testing-library/react';
import { HeroVideo } from '@/components/home/hero-video';

function stubMatchMedia(matches: boolean) {
  vi.stubGlobal('matchMedia', () => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
}

describe('HeroVideo', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('plays muted and looping where video is allowed', () => {
    stubMatchMedia(true);
    const { container } = render(<HeroVideo url="https://media.test/hero.mp4" />);
    const video = container.querySelector('video');
    expect(video).toHaveAttribute('src', 'https://media.test/hero.mp4');
    expect(video?.muted).toBe(true);
    expect(video).toHaveAttribute('loop');
  });

  it('keeps the image alone on phones and for reduced motion', () => {
    stubMatchMedia(false);
    const { container } = render(<HeroVideo url="https://media.test/hero.mp4" />);
    expect(container.querySelector('video')).toBeNull();
  });
});
