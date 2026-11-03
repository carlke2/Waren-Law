import type { PageResponse } from '@waren/shared';
import { BlockRenderer } from '@/components/site/block-renderer';
import { ContactFormFields } from '@/components/site/contact-form';
import { MapEmbed } from '@/components/site/map-embed';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CalendarIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/icons';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import { getOffices, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { formatPhone, mailLink, telLink, whatsAppLink } from '@/lib/utils/links';

const text = dictionary.contact;
const CONTACT_LINK = 'inline-flex min-h-tap items-center gap-2 underline-offset-4 hover:underline';

export async function ContactTemplate({ page }: { page: PageResponse }) {
  const [settings, offices] = await Promise.all([getSettings(), getOffices()]);
  return (
    <>
      <PageHero title={page.title} crumbs={[{ label: page.title }]} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <BlockRenderer blocks={page.body.blocks} />
            <ButtonLink href={settings.booking.url} variant="primary" size="lg" className="mt-6">
              <CalendarIcon className="size-5" />
              {settings.cta.bookingLabel}
            </ButtonLink>
            <ul className="mt-6 grid gap-1">
              {settings.contact.phones.map((phone) => (
                <li key={phone}>
                  <a href={telLink(phone)} className={CONTACT_LINK}>
                    <PhoneIcon className="size-5 text-gold-700" />
                    {formatPhone(phone)}
                  </a>
                </li>
              ))}
              <li>
                <a href={mailLink(settings.contact.email)} className={CONTACT_LINK}>
                  <MailIcon className="size-5 text-gold-700" />
                  {settings.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsAppLink(settings.whatsApp.number, settings.whatsApp.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CONTACT_LINK}
                >
                  <WhatsAppIcon className="size-5 text-gold-700" />
                  {dictionary.cta.whatsApp}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <Heading level={2}>{text.formHeading}</Heading>
            <div className="relative mt-4">
              <ContactFormFields />
            </div>
          </div>
        </div>
      </Section>
      <Section tone="white">
        <Heading level={2}>{text.officesHeading}</Heading>
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {offices.map((office) => (
            <li key={office.slug}>
              <Card className="h-full">
                <h3 className="text-h4">{office.name}</h3>
                <address className="mt-2 text-small text-ink-muted not-italic">
                  {office.building ? <p>{office.building}</p> : null}
                  <p>{office.addressLine}</p>
                  <p>
                    {office.city}, {office.country}
                  </p>
                  {office.poBox ? <p>{office.poBox}</p> : null}
                </address>
                {office.mapEmbedUrl ? (
                  <MapEmbed url={office.mapEmbedUrl} officeName={office.name} />
                ) : null}
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
