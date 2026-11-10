import {
  ROUTES,
  type AwardResponse,
  type HomeResponse,
  type OfficeResponse,
  type PartnerResponse,
} from '@waren/shared';
import type { ReactNode } from 'react';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { ArrowLink, OutlineLink } from './home-links';

interface HomeClosingProps {
  home: HomeResponse;
  bookingLabel: string;
  offices: readonly OfficeResponse[];
  award: AwardResponse | undefined;
  partners: readonly PartnerResponse[];
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-5 border-t border-border pt-6">
      <h2 className="font-heading text-h3-insight font-medium text-brand">{title}</h2>
      {children}
    </div>
  );
}

export function HomeClosing({ home, bookingLabel, offices, award, partners }: HomeClosingProps) {
  return (
    <HomeSection tone="tint">
      <div className="grid gap-12 md:grid-cols-3 md:gap-10">
        <Column title={home.ctaTitle}>
          <p className="text-card-body text-text-muted">{home.ctaBody}</p>
          <div className="mt-auto">
            <ButtonLink href={ROUTES.consultation} variant="primary">
              {bookingLabel}
            </ButtonLink>
          </div>
        </Column>
        <Column title={dictionary.contact.officesHeading}>
          <ul className="flex flex-col gap-4">
            {offices.map((office) => (
              <li key={office.slug} className="flex flex-col">
                <span className="text-card-body font-semibold text-brand">{office.name}</span>
                <span className="text-card-body text-text-muted">{office.addressLine}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto">
            <OutlineLink href={ROUTES.contact}>{dictionary.nav.contactUs}</OutlineLink>
          </div>
        </Column>
        <Column title={dictionary.about.partnersEyebrow}>
          {award ? (
            <p className="flex flex-col">
              <span className="text-category font-bold tracking-category text-brand uppercase">
                {dictionary.home.awardLabel(award.awarder, award.year)}
              </span>
              <span className="text-card-body text-text-body">{award.name}</span>
            </p>
          ) : null}
          {partners.length ? (
            <ul className="flex flex-col gap-1 text-card-body text-text-muted">
              {partners.map(({ slug, name }) => (
                <li key={slug}>{name}</li>
              ))}
            </ul>
          ) : null}
          <div className="mt-auto">
            <ArrowLink href={ROUTES.partners}>{dictionary.nav.partners}</ArrowLink>
          </div>
        </Column>
      </div>
    </HomeSection>
  );
}
