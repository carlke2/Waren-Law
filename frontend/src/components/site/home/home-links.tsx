import type { ReactNode } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';

export const CARD_HOVER_LINE =
  '*:border-t-2 *:border-t-transparent *:transition-colors *:hover:border-t-brand';

export function ArrowLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink
      href={href}
      className="group inline-flex items-center gap-2 text-button font-semibold text-brand hover:underline max-sm:min-h-11"
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform group-hover:translate-x-1"
      >
        {dictionary.home.arrow}
      </span>
    </SiteLink>
  );
}

export function OutlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <SiteLink
      href={href}
      className="inline-flex items-center justify-center rounded-lg border border-brand px-6.5 py-3.5 text-center text-button font-semibold text-brand hover:bg-brand hover:text-on-brand"
    >
      {children}
    </SiteLink>
  );
}
