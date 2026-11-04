import Link from 'next/link';
import type { ComponentProps } from 'react';

// Ground rule 2: the browser fetches page content only when the visitor asks for it.
export function SiteLink(props: ComponentProps<typeof Link>) {
  return <Link prefetch={false} {...props} />;
}
