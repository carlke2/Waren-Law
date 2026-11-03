'use client';

import { useSyncExternalStore } from 'react';

const DESKTOP_WITH_MOTION = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)';

function subscribe(onChange: () => void): () => void {
  const query = window.matchMedia(DESKTOP_WITH_MOTION);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const isDesktop = () => window.matchMedia(DESKTOP_WITH_MOTION).matches;
const onServer = () => false;

export function HeroVideo({ url, className }: { url: string; className?: string }) {
  const show = useSyncExternalStore(subscribe, isDesktop, onServer);
  if (!show) return null;
  return (
    <video src={url} className={className} autoPlay muted loop playsInline aria-hidden="true" />
  );
}
