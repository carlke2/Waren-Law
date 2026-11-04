import type { HeroCard, HomeResponse } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui/icon';
import { dictionary } from '@/lib/dictionary';
import { HeroVideo } from './hero-video';

const text = dictionary.home;
const HERO_IMAGE_SIZES = '100vw';

function HeroCardLink({ card }: { card: HeroCard }) {
  return (
    <Link
      href={card.href}
      className="flex items-center gap-3.5 bg-surface-hero px-4 py-3.5 text-text shadow-card sm:flex-col sm:gap-2.5 sm:px-6 sm:pt-6.5 sm:pb-5.5 sm:text-center"
    >
      <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border text-brand">
        <Icon name={card.icon} className="size-6" />
      </span>
      <h2 className="font-heading text-hero-card-phone font-semibold text-brand sm:text-hero-card">
        {card.title}
      </h2>
      <p className="hidden text-hero-card-copy text-text-muted sm:block">{card.text}</p>
      <span className="mt-1.5 hidden self-stretch bg-brand px-4 py-2.5 text-hero-button font-bold tracking-hero-button text-on-brand sm:block">
        {text.heroCardButton}
      </span>
      <span aria-hidden="true" className="ml-auto font-bold text-brand sm:hidden">
        {text.heroCardArrow}
      </span>
    </Link>
  );
}

export function Hero({ home }: { home: HomeResponse }) {
  return (
    <section data-tone="dark" className="relative -mt-header pt-header">
      <div className="absolute inset-0 overflow-hidden bg-brand-strong">
        <Image
          src={home.heroImage.url}
          alt={home.heroImage.alt}
          fill
          priority
          sizes={HERO_IMAGE_SIZES}
          className="object-cover object-bottom"
        />
        {home.heroVideoUrl ? <HeroVideo url={home.heroVideoUrl} /> : null}
        <div className="hero-overlay absolute inset-0" />
        <div className="hero-overlay-top absolute inset-x-0 top-0" />
      </div>
      <h1 className="sr-only">{home.pageH1}</h1>
      <div className="h-hero-space" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid max-w-hero gap-2.5 px-4 pb-7 sm:grid-auto-hero sm:gap-7 sm:px-8 sm:pb-16">
        {home.heroCards.map((card) => (
          <HeroCardLink key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}
