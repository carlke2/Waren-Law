import { ROUTES, type HomeResponse, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import styles from './latest-insights.module.css';

const INSIGHT_SIZES = '(min-width: 64rem) 40vw, 100vw';
const text = dictionary.home;
const insightText = dictionary.insights;

function formatCardDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(iso));
}

const EXCERPT_MAX_CHARS = 150;

function stripTitlePrefix(raw: string, title: string): string {
  const lower = raw.toLowerCase();
  const full = title.toLowerCase();
  if (lower.startsWith(full)) {
    return raw.slice(title.length).replace(/^[\s:–—-]+/, '').trim();
  }
  const short = title.split(':')[0]?.trim() ?? '';
  if (short.length >= 12 && lower.startsWith(short.toLowerCase())) {
    return raw.slice(short.length).replace(/^[\s:–—-]+/, '').trim();
  }
  return raw;
}

function truncateAtWord(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const slice = text.slice(0, maxChars + 1);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > maxChars * 0.55 ? slice.slice(0, lastSpace) : text.slice(0, maxChars);
  return `${cut.trimEnd()}…`;
}

function cardExcerpt(insight: InsightSummary): string {
  const raw = insight.excerpt.trim();
  if (!raw) return '';
  const cleaned = insight.title.trim() ? stripTitlePrefix(raw, insight.title.trim()) : raw;
  if (!cleaned) return '';
  return truncateAtWord(cleaned, EXCERPT_MAX_CHARS);
}

function categoryLabel(insight: InsightSummary): string | null {
  return insight.categories[0]?.name ?? null;
}

function ScalesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v18M4 7h16M7 7l-3 7h6L7 7zm10 0l-3 7h6l-3-7z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3.5v3M16 3.5v3M3.5 9.5h17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4.5l3 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Curve({ side }: { side: 'left' | 'right' }) {
  const fill =
    side === 'left'
      ? 'M28 0C10 45 10 90 28 135C10 180 10 225 28 270C10 315 10 345 28 360V360H28V0Z'
      : 'M0 0C18 45 18 90 0 135C18 180 18 225 0 270C18 315 18 345 0 360H0V0Z';
  const stroke =
    side === 'left'
      ? 'M26 0C8 45 8 90 26 135C8 180 8 225 26 270C8 315 8 345 26 360'
      : 'M2 0C20 45 20 90 2 135C20 180 20 225 2 270C20 315 20 345 2 360';
  return (
    <svg
      className={`${styles.curve} ${side === 'left' ? styles.curveLeft : styles.curveRight}`}
      viewBox="0 0 28 360"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={fill} fill="var(--insights-card)" />
      <path d={stroke} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DecoSwoosh({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 420 180" aria-hidden="true">
      <path
        d="M20 140C80 40 160 20 240 50C300 72 360 40 400 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="28"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DecoScales({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 240 240" aria-hidden="true">
      <path
        d="M120 28v170M70 60h100M78 60l-22 54h44L78 60zm84 0l-22 54h44L162 60zM95 210h50"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LatestInsights({
  insights,
}: {
  home: HomeResponse;
  insights: readonly InsightSummary[];
}) {
  if (insights.length === 0) return null;

  return (
    <section className={`${styles.section} rise`} aria-labelledby="home-insights-heading">
      <DecoSwoosh className={styles.decoLeft ?? ''} />
      <DecoScales className={styles.decoRight ?? ''} />
      <div className={`site-container ${styles.shell}`}>
        <header className={styles.header}>
          <div className={styles.ornament}>
            <span className={styles.ornamentLine} aria-hidden="true" />
            <ScalesIcon className={styles.ornamentIcon} />
            <span className={styles.ornamentLine} aria-hidden="true" />
          </div>
          <h2 id="home-insights-heading" className={styles.headline}>
            {text.latestInsightsLead}{' '}
            <span className={styles.emphasis}>{text.latestInsightsEmphasis}</span>
          </h2>
          <p className={styles.subtitle}>{text.latestInsightsSubtitle}</p>
          <span className={styles.subtitleRule} aria-hidden="true" />
        </header>

        <ul className={styles.list}>
          {insights.map((insight, index) => {
            const imageLeft = index % 2 === 0;
            const category = categoryLabel(insight);
            const excerpt = cardExcerpt(insight);
            return (
              <li
                key={insight.slug}
                className={styles.item}
                style={{ '--insights-stagger': index } as CSSProperties}
              >
                <SiteLink
                  href={ROUTES.root(insight.slug)}
                  className={`${styles.card} ${imageLeft ? '' : styles.cardReverse}`.trim()}
                >
                  <div className={styles.media}>
                    {insight.featuredImage ? (
                      <Image
                        src={insight.featuredImage.url}
                        alt={insight.featuredImage.alt}
                        fill
                        sizes={INSIGHT_SIZES}
                        className={styles.mediaImg}
                      />
                    ) : (
                      <span className={styles.mediaFallback} aria-hidden="true" />
                    )}
                    <Curve side={imageLeft ? 'left' : 'right'} />
                  </div>
                  <div className={styles.content}>
                    {category ? (
                      <span className={styles.pill}>
                        <ScalesIcon className={styles.pillIcon} />
                        {category}
                      </span>
                    ) : null}
                    <h3 className={styles.title}>{insight.title}</h3>
                    {excerpt ? <p className={styles.excerpt}>{excerpt}</p> : null}
                    <div className={styles.meta}>
                      {insight.publishedAt ? (
                        <>
                          <span className={styles.metaItem}>
                            <CalendarIcon className={styles.metaIcon} />
                            {formatCardDate(insight.publishedAt)}
                          </span>
                          <span className={styles.metaDivider} aria-hidden="true" />
                        </>
                      ) : null}
                      <span className={styles.metaItem}>
                        <ClockIcon className={styles.metaIcon} />
                        {insightText.readingTime(insight.readingMinutes)}
                      </span>
                    </div>
                    <div className={styles.footer}>
                      <span className={styles.readMore}>
                        {text.insightReadMore}
                        <span className={styles.readArrow} aria-hidden="true">
                          {text.arrow}
                        </span>
                      </span>
                    </div>
                  </div>
                </SiteLink>
              </li>
            );
          })}
        </ul>

        <div className={styles.cta}>
          <SiteLink href={ROUTES.insights} className={styles.ctaLink}>
            {text.viewAllInsights}
            <span aria-hidden="true">{text.arrow}</span>
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
