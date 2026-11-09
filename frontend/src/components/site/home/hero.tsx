import type { HomeResponse } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';
import { BrandMark } from '@/components/site/logo';
import { HeroVideo } from './hero-video';

const HERO_IMAGE_SIZES = '100vw';

interface HeroProps {
  home: HomeResponse;
  tagline: string;
  description: string;
  bookingLabel: string;
}

export function Hero({ home, tagline, description, bookingLabel }: HeroProps) {
  return (
    <section data-tone="dark" className="relative -mt-header flex min-h-svh flex-col pt-header">
      <div className="absolute inset-0 overflow-hidden bg-brand-strong">
        <Image
          src={home.heroImage.url}
          alt={home.heroImage.alt}
          fill
          preload
          fetchPriority="high"
          sizes={HERO_IMAGE_SIZES}
          className="object-cover object-center"
        />
        {home.heroVideoUrl ? <HeroVideo url={home.heroVideoUrl} /> : null}
        <div className="hero-veil absolute inset-0" />
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-5 px-5 py-16 text-center">
        {tagline ? (
          <p className="text-eyebrow font-bold tracking-eyebrow text-accent uppercase">{tagline}</p>
        ) : null}
        <h1 className="max-w-h1 font-heading text-h1-page font-medium text-balance text-on-brand">
          {home.pageH1}
        </h1>
        <p className="max-w-intro text-lead text-on-brand-lead">{description}</p>
        <BrandMark className="h-16 w-auto" />
        <div className="mt-2 flex flex-wrap justify-center gap-3.5">
          <ButtonLink href={ROUTES.consultation} variant="gold">
            {bookingLabel}
          </ButtonLink>
          <ButtonLink href={ROUTES.expertise} variant="outline">
            {dictionary.home.heroServices}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
