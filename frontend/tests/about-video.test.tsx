import { fireEvent, render, screen } from '@testing-library/react';
import { AboutVideo, isEmbedUrl } from '@/components/site/about-video';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.about;
const poster = { url: 'https://cdn.test/p.webp', alt: 'Poster', width: 100, height: 100 };

vi.mock('next/image', () => ({
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

describe('AboutVideo', () => {
  it('shows only the poster and a message until a video is set', () => {
    render(<AboutVideo url={null} captionsUrl={null} poster={poster} />);
    expect(screen.getByAltText('Poster')).toBeInTheDocument();
    expect(screen.getByText(text.videoComingSoon)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('loads no video until the play button is pressed', () => {
    const { container } = render(
      <AboutVideo url="https://cdn.test/v.mp4" captionsUrl={null} poster={poster} />,
    );
    expect(container.querySelector('video, iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: text.playVideo }));
    expect(container.querySelector('video')).toHaveAttribute('src', 'https://cdn.test/v.mp4');
  });

  it('adds a captions track to a video file', () => {
    const { container } = render(
      <AboutVideo
        url="https://cdn.test/v.mp4"
        captionsUrl="https://cdn.test/c.vtt"
        poster={poster}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: text.playVideo }));
    expect(container.querySelector('track')).toHaveAttribute('src', 'https://cdn.test/c.vtt');
  });

  it('uses an iframe for hosted video', () => {
    const url = 'https://www.youtube-nocookie.com/embed/abc';
    render(<AboutVideo url={url} captionsUrl={null} poster={poster} />);
    fireEvent.click(screen.getByRole('button', { name: text.playVideo }));
    expect(screen.getByTitle(text.videoTitle)).toHaveAttribute('src', url);
  });

  it('recognises embed hosts', () => {
    expect(isEmbedUrl('https://www.youtube.com/embed/a')).toBe(true);
    expect(isEmbedUrl('https://notyoutube.com/a')).toBe(false);
  });
});
