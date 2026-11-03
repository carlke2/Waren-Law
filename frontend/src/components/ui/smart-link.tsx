import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { isExternalLink } from '@/lib/utils/links';

type SmartLinkProps = Omit<ComponentProps<'a'>, 'href'> & { href: string; children: ReactNode };

export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (!isExternalLink(href)) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const opensNewTab = href.startsWith('http');
  return (
    <a
      href={href}
      {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
