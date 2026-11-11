import { SiteLink } from '@/components/ui/site-link';
import type { ReactNode } from 'react';
import { cx } from '@/lib/utils/cx';

const VARIANTS = {
  primary: 'rounded-lg bg-brand px-6.5 py-3.5 font-semibold text-on-brand',
  gold: 'rounded-lg bg-accent px-7 py-4 font-bold text-on-accent',
  outline: 'rounded-lg border border-outline-on-brand px-6.5 py-3.5 font-semibold text-on-brand',
  'outline-large':
    'rounded-lg border border-outline-on-brand px-6.75 py-3.75 font-semibold text-on-brand',
  pill: 'rounded-full bg-brand px-6.5 py-3.5 font-semibold text-on-brand',
  soft: 'rounded-full bg-accent-soft px-6 py-3.5 font-semibold text-ink',
  line: 'rounded-full border border-ink bg-surface px-6 py-3.5 font-semibold text-ink',
} as const;

interface ButtonLinkProps {
  href: string;
  variant: keyof typeof VARIANTS;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({ href, variant, external, className, children }: ButtonLinkProps) {
  const classes = cx(
    'inline-flex items-center justify-center gap-2 text-center text-button',
    VARIANTS[variant],
    className,
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {children}
    </a>
  ) : (
    <SiteLink href={href} className={classes}>
      {children}
    </SiteLink>
  );
}
