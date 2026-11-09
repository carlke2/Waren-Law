'use client';

import type { MediaRef } from '@waren/shared';
import Image from 'next/image';
import { useState } from 'react';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.about;
const POSTER_SIZES = '(min-width: 64rem) 60rem, 100vw';

interface AboutFilmProps {
  url: string | null;
  captionsUrl: string | null;
  poster: MediaRef;
}

export function AboutFilm({ url, captionsUrl, poster }: AboutFilmProps) {
  const [playing, setPlaying] = useState(false);

  if (url && playing) {
    return (
      <video
        controls
        autoPlay
        preload="none"
        className="aspect-film w-full max-w-film bg-brand-strong"
      >
        <source src={url} />
        {captionsUrl ? (
          <track kind="captions" src={captionsUrl} srcLang="en" label={text.captions} default />
        ) : null}
      </video>
    );
  }

  return (
    <div className="relative flex aspect-film w-full max-w-film items-center justify-center bg-placeholder">
      <Image
        src={poster.url}
        alt={poster.alt}
        fill
        sizes={POSTER_SIZES}
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-overlay-film" />
      {url ? (
        <button
          type="button"
          aria-label={text.playVideo}
          onClick={() => setPlaying(true)}
          className="relative inline-flex size-22 items-center justify-center rounded-full bg-surface text-brand"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-9">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      ) : null}
    </div>
  );
}
