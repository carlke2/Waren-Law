'use client';

import type { MediaRef } from '@waren/shared';
import Image from 'next/image';
import { useState } from 'react';
import { PlayIcon } from '@/components/ui/icons';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.about;
const EMBED_HOSTS = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be|vimeo\.com)$/;
const POSTER_SIZES = '(min-width: 75rem) 72rem, 100vw';
const FRAME = 'relative aspect-feature w-full overflow-hidden rounded-md bg-navy-950';

export function isEmbedUrl(url: string): boolean {
  return EMBED_HOSTS.test(new URL(url).hostname);
}

interface AboutVideoProps {
  url: string | null;
  captionsUrl: string | null;
  poster: MediaRef;
}

function Poster({ poster }: Pick<AboutVideoProps, 'poster'>) {
  return (
    <Image
      src={poster.url}
      alt={poster.alt}
      fill
      sizes={POSTER_SIZES}
      className="object-cover object-top"
    />
  );
}

export function AboutVideo({ url, captionsUrl, poster }: AboutVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (!url) {
    return (
      <figure>
        <div className={FRAME}>
          <Poster poster={poster} />
        </div>
        <figcaption className="mt-3 text-small text-ink-muted">{text.videoComingSoon}</figcaption>
      </figure>
    );
  }

  if (!playing) {
    return (
      <div className={FRAME}>
        <Poster poster={poster} />
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center"
          aria-label={text.playVideo}
        >
          <span className="flex size-20 items-center justify-center rounded-full bg-gold-500 text-navy-900">
            <PlayIcon className="size-9" />
          </span>
        </button>
      </div>
    );
  }

  if (isEmbedUrl(url)) {
    return (
      <div className={FRAME}>
        <iframe
          src={url}
          title={text.videoTitle}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      </div>
    );
  }

  return (
    <div className={FRAME}>
      <video src={url} controls autoPlay playsInline className="absolute inset-0 size-full">
        {captionsUrl ? (
          <track kind="captions" src={captionsUrl} srcLang="en-GB" label={text.captions} default />
        ) : null}
      </video>
    </div>
  );
}
