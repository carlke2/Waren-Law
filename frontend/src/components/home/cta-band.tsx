import { ROUTES, type HomeResponse, type SiteSettings } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/dictionary';
import { whatsAppLink } from '@/lib/utils/links';

const text = dictionary.cta;
const STACKED_BUTTON = 'max-sm:w-full';

interface CtaBandProps {
  home: HomeResponse;
  whatsApp: SiteSettings['whatsApp'];
}

export function CtaBand({ home, whatsApp }: CtaBandProps) {
  return (
    <section data-tone="dark" className="bg-brand-strong text-on-brand">
      <div className="site-container flex flex-wrap items-center justify-between gap-8 py-16 sm:py-22 lg:py-24">
        <div className="flex max-w-section-header flex-col gap-3">
          <h2 className="font-heading text-h2-cta font-medium">{home.ctaTitle}</h2>
          <p className="text-intro text-on-brand-muted">{home.ctaBody}</p>
        </div>
        <div className="flex flex-wrap gap-3.5 max-sm:w-full">
          <ButtonLink href={ROUTES.contact} variant="gold" className={STACKED_BUTTON}>
            {text.consultation}
          </ButtonLink>
          <ButtonLink
            href={whatsAppLink(whatsApp.number, whatsApp.message)}
            variant="outline-large"
            external
            className={STACKED_BUTTON}
          >
            {text.whatsApp}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
