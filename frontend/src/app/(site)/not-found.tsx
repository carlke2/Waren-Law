import type { Metadata } from 'next';
import { ROUTES } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/layout';
import { Eyebrow, Heading, Lead } from '@/components/ui/typography';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.notFound;

export const metadata: Metadata = { title: text.title, robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <Section>
      <Eyebrow>{text.eyebrow}</Eyebrow>
      <Heading level={1} className="mt-2">
        {text.title}
      </Heading>
      <Lead className="mt-4">{text.description}</Lead>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={ROUTES.home}>{text.home}</ButtonLink>
        <ButtonLink href={ROUTES.search} variant="outline">
          {text.search}
        </ButtonLink>
        <ButtonLink href={ROUTES.contact} variant="outline">
          {text.contact}
        </ButtonLink>
      </div>
    </Section>
  );
}
