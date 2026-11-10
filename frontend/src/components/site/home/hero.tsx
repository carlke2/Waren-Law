import type { HomeResponse } from '@waren/shared';
import Image from 'next/image';
import { dictionary } from '@/lib/utils/dictionary';
import { HOME_INTRO_ID } from './home-intro';
import { HomeHeroVideo } from './home-hero-video';

const HERO_IMAGE_SIZES = '100vw';

export function Hero({ home }: { home: HomeResponse }) {
  const poster = home.heroImage.url;
  return (
    <section className="relative -mt-header h-hero-home overflow-hidden bg-brand-strong">
      <Image
        src={poster}
        alt=""
        fill
        preload
        fetchPriority="high"
        sizes={HERO_IMAGE_SIZES}
        className="object-cover object-center"
      />
      {home.heroVideoUrl ? <HomeHeroVideo url={home.heroVideoUrl} poster={poster} /> : null}
      <div className="hero-overlay-top pointer-events-none absolute inset-x-0 top-0" />
      <a
        href={`#${HOME_INTRO_ID}`}
        aria-label={dictionary.home.scrollCue}
        className="hero-control absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
