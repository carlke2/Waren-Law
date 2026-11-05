import type { ComponentProps } from 'react';
import { cx } from '@/lib/utils/cx';

const BASE =
  'h-9 w-full min-w-0 rounded-lg border border-border-strong bg-surface px-2.5 text-text transition-colors placeholder:text-text-subtle disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error';

export function inputClass(className?: string): string {
  return cx(BASE, className);
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input data-slot="input" className={inputClass(className)} {...props} />;
}
