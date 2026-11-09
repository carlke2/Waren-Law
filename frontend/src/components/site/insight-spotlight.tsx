'use client';

import { ROUTES, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { useState } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import { formatDate } from '@/lib/utils/dates';
import { cx } from '@/lib/utils/cx';
import { InsightAuthors } from './insight-authors';

const BANNER_IMAGE_SIZES = '100vw';
const text = dictionary.insights;

function metaLine(insight: InsightSummary): string {
  const categories = insight.categories.map(({ name }) => name).join(', ');
  const date = insight.publishedAt ? formatDate(insight.publishedAt) : '';
  return [date, categories].filter(Boolean).join(' | ');
}

export function InsightSpotlight({ slides }: { slides: readonly InsightSummary[] }) {
  const [active, setActive] = useState(0);
  const count = slides.length;
  const step = (delta: number) => setActive((current) => (current + delta + count) % count);

  return (
    <section data-tone="dark" className="relative -mt-header bg-brand-strong pt-header">
      {slides.map((insight, index) => {
        const current = index === active;
        const Title = current ? 'h1' : 'p';
        return (
          <article
            key={insight.slug}
            className={cx('relative aspect-insight-banner', !current && 'hidden')}
            aria-hidden={current ? undefined : true}
          >
            {insight.featuredImage ? (
              <Image
                src={insight.featuredImage.url}
                alt={insight.featuredImage.alt}
                fill
                preload={index === 0}
                fetchPriority={index === 0 ? 'high' : 'low'}
                sizes={BANNER_IMAGE_SIZES}
                className="object-cover object-center"
              />
            ) : null}
            <div className="hero-veil absolute inset-0" />
            <div className="relative z-10 flex h-full items-end">
              <div className="site-container flex w-full flex-col gap-4 pt-16 pb-12 sm:pb-16">
                <p className="text-eyebrow font-bold tracking-eyebrow text-on-brand uppercase">
                  {text.title}
                </p>
                <Title className="max-w-h1 font-heading text-h2 font-medium text-balance text-on-brand uppercase">
                  {insight.title}
                </Title>
                <p className="text-link text-on-brand-muted">
                  <InsightAuthors authors={insight.authors} />
                  {insight.authors.length && metaLine(insight) ? ' | ' : null}
                  {metaLine(insight)}
                </p>
                <SiteLink
                  href={ROUTES.root(insight.slug)}
                  className="mt-2 inline-block self-start bg-accent px-7 py-3 text-button font-bold text-on-accent"
                >
                  {text.readMore}
                </SiteLink>
              </div>
            </div>
          </article>
        );
      })}
      {count > 1 ? (
        <>
          <button
            type="button"
            aria-label={text.previousSlide}
            onClick={() => step(-1)}
            className="absolute top-1/2 left-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center text-on-brand"
          >
            <Chevron direction="previous" />
          </button>
          <button
            type="button"
            aria-label={text.nextSlide}
            onClick={() => step(1)}
            className="absolute top-1/2 right-3 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center text-on-brand"
          >
            <Chevron direction="next" />
          </button>
        </>
      ) : null}
    </section>
  );
}

function Chevron({ direction }: { direction: 'previous' | 'next' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-6"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        d={direction === 'previous' ? 'M15 6 L9 12 L15 18' : 'M9 6 L15 12 L9 18'}
        strokeWidth="1.5"
      />
    </svg>
  );
}
