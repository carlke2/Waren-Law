'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';

const MOTION_ALLOWED = '(prefers-reduced-motion: no-preference)';
const SLOW_CONNECTIONS: readonly string[] = ['slow-2g', '2g'];
const text = dictionary.home;

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

function prefersLightData(): boolean {
  const { connection } = navigator as Navigator & { connection?: NetworkInformation };
  return (
    Boolean(connection?.saveData) || SLOW_CONNECTIONS.includes(connection?.effectiveType ?? '')
  );
}

function whenIdle(run: () => void): () => void {
  if (typeof requestIdleCallback === 'function') {
    const id = requestIdleCallback(run);
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(run);
  return () => clearTimeout(id);
}

export function HomeHeroVideo({ url, poster }: { url: string; poster?: string }) {
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (prefersLightData()) return;
    const motion = window.matchMedia(MOTION_ALLOWED);
    let cancelIdle = () => {};
    const update = () => {
      cancelIdle();
      setReady(false);
      if (motion.matches) cancelIdle = whenIdle(() => setReady(true));
    };
    update();
    motion.addEventListener('change', update);
    return () => {
      cancelIdle();
      motion.removeEventListener('change', update);
    };
  }, []);

  function togglePlayback() {
    const element = video.current;
    if (!element) return;
    if (paused) void element.play();
    else element.pause();
    setPaused(!paused);
  }

  if (!ready) {
    return poster ? (
      <Image src={poster} alt="" fill sizes="100vw" className="object-cover object-center" />
    ) : null;
  }

  return (
    <>
      <video
        ref={video}
        src={url}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        className="absolute inset-0 size-full object-cover object-center"
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={paused ? text.playVideo : text.pauseVideo}
        className="hero-control absolute top-header right-6 z-10"
      >
        <LineSvg className="size-4">
          {paused ? <path d="M8 5.5v13l10-6.5z" /> : <path d="M9 5.5v13M15 5.5v13" />}
        </LineSvg>
      </button>
    </>
  );
}
