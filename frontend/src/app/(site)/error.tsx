'use client';

import { ROUTES } from '@waren/shared/constants';
import { Button, ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/layout';
import { Heading, Lead } from '@/components/ui/typography';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.error;

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <Section>
      <Heading level={1}>{text.title}</Heading>
      <Lead className="mt-4">{text.description}</Lead>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={reset}>{text.retry}</Button>
        <ButtonLink href={ROUTES.contact} variant="outline">
          {text.contact}
        </ButtonLink>
      </div>
    </Section>
  );
}
