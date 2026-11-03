import type { ReactNode } from 'react';
import { ROUTES } from '@waren/shared';
import { Breadcrumbs, type Crumb } from '@/components/ui/breadcrumbs';
import { Container } from '@/components/ui/layout';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { dictionary } from '@/lib/dictionary';

interface PageHeroProps {
  title: string;
  lead?: string | null | undefined;
  eyebrow?: string | undefined;
  crumbs: readonly Crumb[];
  children?: ReactNode;
}

export function PageHero({ title, lead, eyebrow, crumbs, children }: PageHeroProps) {
  return (
    <div data-tone="dark" className="bg-navy-900 py-12 text-on-dark-muted md:py-16">
      <Container>
        <Breadcrumbs
          label={dictionary.common.breadcrumb}
          crumbs={[{ label: dictionary.common.home, href: ROUTES.home }, ...crumbs]}
        />
        {eyebrow ? <Eyebrow className="mt-6">{eyebrow}</Eyebrow> : null}
        <Heading level={1} className={eyebrow ? 'mt-2' : 'mt-6'}>
          {title}
        </Heading>
        {lead ? <Lead className="mt-4">{lead}</Lead> : null}
        {children}
      </Container>
    </div>
  );
}
