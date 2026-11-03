import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cx('mx-auto w-full max-w-site px-gutter md:px-8', className)} {...props} />
  );
}

type Tone = 'paper' | 'white' | 'sand' | 'navy' | 'deep';

const TONES: Record<Tone, string> = {
  paper: 'bg-paper',
  white: 'bg-surface',
  sand: 'bg-sand',
  navy: 'bg-navy-900 text-on-dark',
  deep: 'bg-navy-950 text-on-dark',
};

export function Section({
  tone = 'paper',
  className,
  children,
  ...props
}: ComponentProps<'section'> & { tone?: Tone }) {
  const dark = tone === 'navy' || tone === 'deep';
  return (
    <section
      data-tone={dark ? 'dark' : undefined}
      className={cx('py-section', TONES[tone], className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="sr-only">{children}</span>;
}
