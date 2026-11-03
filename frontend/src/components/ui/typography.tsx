import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

type Level = 1 | 2 | 3 | 4;
type Size = 'display' | 'h1' | 'h2' | 'h3' | 'h4';

const SIZES: Record<Size, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
};

export function Heading({
  level,
  size,
  className,
  children,
  ...props
}: ComponentProps<'h2'> & { level: Level; size?: Size }) {
  const Tag = `h${level}` as const;
  const defaultSize = `h${level}` as Size;
  return (
    <Tag className={cx(SIZES[size ?? defaultSize], className)} {...props}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx(
        'text-caption font-semibold tracking-(--tracking-label) text-gold-700 uppercase in-data-[tone=dark]:text-gold-400',
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Lead({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cx(
        'max-w-lead text-lead text-ink-muted in-data-[tone=dark]:text-on-dark-muted',
        className,
      )}
      {...props}
    />
  );
}

export function Prose({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cx('prose-content', className)} {...props} />;
}
