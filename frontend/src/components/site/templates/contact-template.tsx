import type { PageResponse } from '@waren/shared';
import { SiteCta } from '@/components/home/cta-band';
import { Eyebrow } from '@/components/ui/eyebrow';
import { getOffices, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { formatPhone, mailLink, telLink, whatsAppLink } from '@/lib/utils/links';
import { LeadForm } from '../lead-form';
import { MapEmbed } from '../map-embed';
import { PageHero } from '../page-hero';

const text = dictionary.contact;
const DIRECT_LINK =
  'flex min-h-11 items-center text-intro font-semibold text-brand hover:text-accent-text';

export async function ContactTemplate({ page }: { page: PageResponse }) {
  const [settings, offices] = await Promise.all([getSettings(), getOffices()]);
  return (
    <>
      <PageHero
        title={page.title}
        eyebrow={text.eyebrow}
        intro={settings.pageCopy.contact.heroIntro}
        crumbs={[{ label: page.title }]}
      />
      <section className="bg-surface">
        <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
          <div className="flex min-w-0 flex-welcome-body flex-col gap-7">
            <h2 className="font-heading text-h2 font-medium text-brand">{text.formHeading}</h2>
            <LeadForm form="contact" submitLabel={dictionary.leadForm.sendMessage} />
          </div>
          <div className="flex min-w-0 flex-welcome-title flex-col gap-3">
            <Eyebrow>{text.directEyebrow}</Eyebrow>
            {settings.contact.phones.map((phone) => (
              <a key={phone} href={telLink(phone)} className={DIRECT_LINK}>
                {formatPhone(phone)}
              </a>
            ))}
            <a href={mailLink(settings.contact.email)} className={DIRECT_LINK}>
              {settings.contact.email}
            </a>
            <a
              href={whatsAppLink(settings.whatsApp.number, settings.whatsApp.message)}
              target="_blank"
              rel="noopener noreferrer"
              className={DIRECT_LINK}
            >
              {dictionary.cta.whatsApp}
            </a>
          </div>
        </div>
      </section>
      <section className="bg-surface-alt">
        <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
          <h2 className="font-heading text-h2 font-medium text-brand">{text.officesHeading}</h2>
          <div className="grid grid-auto-insight gap-7">
            {offices.map((office) => (
              <div
                key={office.slug}
                className="flex flex-col gap-3.5 border border-b-card-rule border-border border-b-brand bg-surface px-7 py-8"
              >
                <h3 className="font-heading text-h3-card font-semibold text-brand">
                  {office.name}
                </h3>
                <p className="text-card-body text-text-muted">
                  {[office.building, office.addressLine, office.city, office.country]
                    .filter(Boolean)
                    .join(', ')}
                </p>
                {office.poBox ? (
                  <p className="text-card-body text-text-muted">{office.poBox}</p>
                ) : null}
                {office.mapEmbedUrl ? (
                  <MapEmbed url={office.mapEmbedUrl} officeName={office.name} />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      <SiteCta />
    </>
  );
}
