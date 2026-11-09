'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { LineSvg } from '@/components/ui/icon';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/utils/dictionary';

const COUNT_MS = 2000;
const REVEAL_AT = 0.3;
const GROUPED_FROM = 10_000;
const text = dictionary.home;

const STATS: readonly {
  target: number;
  suffix: string;
  label: string;
  icon: ReactNode;
}[] = [
  { target: 120, suffix: '', label: text.qualifiedLawyers, icon: <IdCardIcon /> },
  { target: 1900, suffix: '+', label: text.successfulCases, icon: <BooksIcon /> },
  { target: 1825, suffix: '+', label: text.happyClients, icon: <SmileyIcon /> },
  { target: 140, suffix: '+', label: text.honorsAwards, icon: <TrophyIcon /> },
];

function formatStat(value: number, suffix: string): string {
  const digits = value >= GROUPED_FROM ? value.toLocaleString('en-GB') : String(value);
  return `${digits}${suffix}`;
}

function countUp(node: HTMLElement, frames: Set<number>) {
  const target = Number(node.dataset.target);
  const suffix = node.dataset.suffix ?? '';
  if (!Number.isFinite(target)) return;
  const started = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - started) / COUNT_MS, 1);
    const eased = 1 - (1 - progress) ** 3;
    const value = progress === 1 ? target : Math.round(eased * target);
    node.textContent = formatStat(value, suffix);
    if (progress < 1) frames.add(requestAnimationFrame(tick));
  };
  node.textContent = formatStat(0, suffix);
  frames.add(requestAnimationFrame(tick));
}

export function StatsBar() {
  const bar = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = bar.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const frames = new Set<number>();
    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || played) return;
        played = true;
        observer.disconnect();
        root
          .querySelectorAll<HTMLElement>('[data-target]')
          .forEach((node) => countUp(node, frames));
      },
      { threshold: REVEAL_AT },
    );
    observer.observe(root);
    return () => {
      observer.disconnect();
      frames.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  return (
    <section ref={bar} data-tone="dark" className="bg-brand-soft text-on-brand">
      <ul className="site-container grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        {STATS.map((stat) => (
          <li
            key={stat.label}
            className="surface-card flex flex-row items-center justify-center gap-3 px-4 py-6 sm:gap-4"
          >
            {stat.icon}
            <div className="min-w-0">
              <p className="font-heading text-stat text-brand">
                <span
                  data-target={stat.target}
                  data-suffix={stat.suffix}
                  aria-hidden="true"
                  className="inline-block min-w-stat text-left whitespace-nowrap tabular-nums"
                >
                  {formatStat(stat.target, stat.suffix)}
                </span>
                <span className="sr-only">{formatStat(stat.target, stat.suffix)}</span>
              </p>
              <Eyebrow onBrand>{stat.label}</Eyebrow>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function IdCardIcon() {
  return (
    <LineSvg className="size-8 shrink-0 text-accent sm:size-10">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M6.2 16c.4-1.8 1.5-2.7 2.8-2.7s2.4.9 2.8 2.7" />
      <path d="M14 9h4" />
      <path d="M14 13h4" />
    </LineSvg>
  );
}

function BooksIcon() {
  return (
    <LineSvg className="size-8 shrink-0 text-accent sm:size-10">
      <path d="M4 19.5V6a1 1 0 0 1 1-1h5.5A2.5 2.5 0 0 1 13 7.5V20" />
      <path d="M20 19.5V6a1 1 0 0 0-1-1h-5.5A2.5 2.5 0 0 0 11 7.5V20" />
      <path d="M4 19.5h16" />
    </LineSvg>
  );
}

function SmileyIcon() {
  return (
    <LineSvg className="size-8 shrink-0 text-accent sm:size-10">
      <circle cx="12" cy="12" r="9" />
      <circle cx="9" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="15" cy="10" r="0.8" fill="currentColor" stroke="none" />
      <path d="M8 14.5c1 1.6 2.2 2.3 4 2.3s3-.7 4-2.3" />
    </LineSvg>
  );
}

function TrophyIcon() {
  return (
    <LineSvg className="size-8 shrink-0 text-accent sm:size-10">
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 3h10v6a5 5 0 0 1-10 0z" />
      <path d="M7 5H4.5v1.5A3.5 3.5 0 0 0 8 10" />
      <path d="M17 5h2.5v1.5A3.5 3.5 0 0 1 16 10" />
    </LineSvg>
  );
}
