import type { ComponentProps } from 'react';
import { cx } from '@/lib/utils/cx';

export function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cx('rounded-md border border-line bg-surface p-6 text-ink', className)}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cx(
        'inline-block rounded-sm border border-gold-700 px-2 py-0.5 text-caption font-medium text-gold-700 in-data-[tone=dark]:border-gold-400 in-data-[tone=dark]:text-gold-400',
        className,
      )}
      {...props}
    />
  );
}
