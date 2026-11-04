import type { ReactNode } from 'react';
import { SiteLink } from './site-link';

const CLASSES =
  'inline-flex items-center border-b-2 border-accent pb-1 text-button font-bold text-brand max-sm:min-h-11';

interface TextLinkProps {
  href: string;
  external?: boolean;
  children: ReactNode;
}

export function TextLink({ href, external, children }: TextLinkProps) {
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={CLASSES}>
      {children}
    </a>
  ) : (
    <SiteLink href={href} className={CLASSES}>
      {children}
    </SiteLink>
  );
}
