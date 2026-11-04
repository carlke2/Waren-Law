'use client';

import { useEffect, useState } from 'react';

const VIDEO_ALLOWED = '(min-width: 40rem) and (prefers-reduced-motion: no-preference)';

export function HeroVideo({ url }: { url: string }) {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(VIDEO_ALLOWED);
    const update = () => setAllowed(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  if (!allowed) return null;
  return (
    <video
      src={url}
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover object-bottom"
    />
  );
}
