import { ROUTES, type HomeResponse, type OfficeResponse, type SiteSettings } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';
import { whatsAppLink } from '@/lib/utils/links';

function officeLine(offices: readonly OfficeResponse[]): string {
  return offices.map(({ city }) => city).join(' & ');
}

export function HomePrefooter({
  home,
  offices,
  bookingLabel,
  whatsApp,
}: {
  home: HomeResponse;
  offices: readonly OfficeResponse[];
  bookingLabel: string;
  whatsApp: SiteSettings['whatsApp'];
}) {
  const places = officeLine(offices);
  return (
    <section className="rise bg-surface-deep">
      <div className="site-container grid gap-10 py-section md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-h3-card text-ink">{home.ctaTitle}</h2>
          <p className="text-text-body">{home.ctaBody}</p>
          <ButtonLink href={ROUTES.consultation} variant="line" className="self-start">
            {bookingLabel}
            <span aria-hidden="true">{dictionary.home.arrow}</span>
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-h3-card text-ink">{dictionary.home.officesLabel}</h2>
          {places ? <p className="text-text-body">{places}</p> : null}
          <ButtonLink href={ROUTES.contact} variant="line" className="self-start">
            {dictionary.contact.officesHeading}
            <span aria-hidden="true">{dictionary.home.arrow}</span>
          </ButtonLink>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-h3-card text-ink">{dictionary.home.talkToUs}</h2>
          <ButtonLink
            href={whatsAppLink(whatsApp.number, whatsApp.message)}
            variant="line"
            external
            className="self-start"
          >
            {dictionary.cta.whatsApp}
            <span aria-hidden="true">{dictionary.home.arrow}</span>
          </ButtonLink>
          <ButtonLink href={ROUTES.contact} variant="line" className="self-start">
            {dictionary.footer.contact}
            <span aria-hidden="true">{dictionary.home.arrow}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
