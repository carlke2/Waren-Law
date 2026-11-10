import type { ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

const TONES = {
  plain: 'bg-surface',
  tint: 'bg-surface-alt',
} as const;

interface HomeSectionProps {
  tone: keyof typeof TONES;
  id?: string;
  className?: string;
  children: ReactNode;
}

export function HomeSection({ tone, id, className, children }: HomeSectionProps) {
  return (
    <section id={id} className={cx(TONES[tone], id && 'scroll-mt-header')}>
      <div className={cx('site-container flex flex-col gap-12 py-16 sm:py-28', className)}>
        {children}
      </div>
    </section>
  );
}
