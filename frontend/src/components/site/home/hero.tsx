import type { HomeResponse } from '@waren/shared';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeHeroVideo } from './home-hero-video';

export function Hero({ home }: { home: HomeResponse }) {
  return (
    <section className="relative -mt-header h-hero-home overflow-hidden bg-surface-warm">
      {home.heroVideoUrl ? (
        <HomeHeroVideo url={home.heroVideoUrl} />
      ) : (
        <p className="site-container flex h-full items-end py-section text-lead text-ink">
          {dictionary.home.filmMissing}
        </p>
      )}
    </section>
  );
}
