import type { ComponentProps, ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';
import { SmartLink } from './smart-link';

type Variant = 'primary' | 'accent' | 'outline' | 'outline-dark' | 'link';
type Size = 'md' | 'lg';

const BASE =
  'inline-flex min-h-tap items-center justify-center gap-2 rounded-sm font-medium transition-colors duration-(--duration-calm) ease-(--ease-calm) disabled:cursor-not-allowed disabled:opacity-60';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-navy-900 text-on-dark hover:bg-navy-800',
  accent: 'bg-gold-500 text-navy-900 hover:bg-gold-400',
  outline: 'border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-on-dark',
  'outline-dark': 'border border-on-dark-muted text-on-dark hover:bg-on-dark hover:text-navy-900',
  link: 'text-gold-700 underline underline-offset-4 hover:text-navy-900',
};

const SIZES: Record<Size, string> = {
  md: 'px-5 py-2 text-small',
  lg: 'px-7 py-3 text-body',
};

interface StyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

function buttonClasses({ variant = 'primary', size = 'md', className }: StyleProps): string {
  return cx(BASE, VARIANTS[variant], variant !== 'link' && SIZES[size], className);
}

export function Button({
  variant,
  size,
  className,
  children,
  type = 'button',
  ...props
}: StyleProps & ComponentProps<'button'>) {
  return (
    <button
      type={type}
      className={buttonClasses({ variant, size, className, children })}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant,
  size,
  className,
  children,
  href,
  ...props
}: StyleProps & Omit<ComponentProps<'a'>, 'href'> & { href: string }) {
  return (
    <SmartLink
      href={href}
      className={buttonClasses({ variant, size, className, children })}
      {...props}
    >
      {children}
    </SmartLink>
  );
}
