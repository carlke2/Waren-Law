import { ROUTES, type OfficeResponse } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';
import { mailLink, telLink } from '@/lib/utils/links';

const text = dictionary.contact;

export function OfficesBand({ offices }: { offices: readonly OfficeResponse[] }) {
  if (!offices.length) return null;
  return (
    <section data-tone="dark" className="bg-brand text-on-brand">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-section-header flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span className="h-rule w-rule-short bg-accent" />
              <Eyebrow onBrand>{text.eyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-h2 font-medium">{text.officesHeading}</h2>
          </div>
          <ButtonLink href={ROUTES.contact} variant="outline">
            {dictionary.nav.contactUs}
          </ButtonLink>
        </div>
        <div className="grid grid-auto-team gap-8">
          {offices.map((office) => (
            <article
              key={office.slug}
              className="flex flex-col gap-2 border-t-2 border-accent pt-5"
            >
              <h3 className="font-heading text-h3-card font-semibold uppercase">{office.city}</h3>
              <p className="text-card-body text-on-brand-muted">{office.name}</p>
              <p className="text-card-body text-on-brand-muted">{office.addressLine}</p>
              {office.phone ? (
                <a href={telLink(office.phone)} className="text-link hover:text-accent">
                  {office.phone}
                </a>
              ) : null}
              {office.email ? (
                <a href={mailLink(office.email)} className="text-link hover:text-accent">
                  {office.email}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
