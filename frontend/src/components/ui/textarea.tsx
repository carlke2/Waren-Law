import type { ComponentProps } from 'react';
import { cx } from '@/lib/utils/cx';

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cx(
        'flex field-sizing-content min-h-16 w-full rounded-lg border border-border-strong bg-surface px-2.5 py-2 text-text transition-colors placeholder:text-text-subtle disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error',
        className,
      )}
      {...props}
    />
  );
}
