import type { ButtonHTMLAttributes } from 'react';
import { cx } from '@/lib/utils/cx';

const BASE =
  'inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-button font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50';

const VARIANTS = {
  default: 'bg-brand text-on-brand',
  accent: 'bg-accent text-on-accent',
  blue: 'bg-team-accent text-on-brand hover:bg-brand',
  outline: 'border-border-strong bg-surface text-brand',
  soft: 'bg-accent-soft text-ink',
} as const;

const SIZES = {
  default: 'h-9 gap-1.5 px-3',
  lg: 'h-11 px-4',
} as const;

type ButtonVariant = keyof typeof VARIANTS;
type ButtonSize = keyof typeof SIZES;

export function buttonClass({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}): string {
  return cx(BASE, VARIANTS[variant], SIZES[size], className);
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonClass({ variant, size, className })} {...props} />;
}
