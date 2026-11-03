import type { SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button';
import { Section } from '@/components/ui/layout';
import { Heading, Lead } from '@/components/ui/typography';
import { dictionary } from '@/lib/dictionary';
import { whatsAppLink } from '@/lib/utils/links';

export function CtaBand({ settings }: { settings: SiteSettings }) {
  return (
    <Section tone="navy">
      <Heading level={2}>{settings.cta.heading}</Heading>
      <Lead className="mt-3">{settings.cta.text}</Lead>
      <div className="mt-6 flex flex-wrap gap-3">
        <ButtonLink href={settings.booking.url} variant="accent" size="lg">
          {settings.cta.bookingLabel}
        </ButtonLink>
        <ButtonLink
          href={whatsAppLink(settings.whatsApp.number, settings.whatsApp.message)}
          variant="outline-dark"
          size="lg"
        >
          {dictionary.cta.whatsApp}
        </ButtonLink>
        <ButtonLink href={ROUTES.contact} variant="outline-dark" size="lg">
          {dictionary.cta.contact}
        </ButtonLink>
      </div>
    </Section>
  );
}
