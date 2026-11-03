import type { MediaRef, PageResponse } from '@waren/shared';
import Image from 'next/image';
import { BlockRenderer } from '@/components/site/block-renderer';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import { getOffices, getPartners, getSettings } from '@/lib/api/content';
import { groupSections } from '@/lib/content/sections';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.partners;
const GALLERY_IMAGE_SIZES = '(min-width: 48rem) 18rem, 50vw';

function Gallery({ images }: { images: readonly MediaRef[] }) {
  if (!images.length) return null;
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {images.map((image) => (
        <li key={image.url}>
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width ?? undefined}
            height={image.height ?? undefined}
            sizes={GALLERY_IMAGE_SIZES}
            className="aspect-feature w-full rounded-md object-cover"
          />
        </li>
      ))}
    </ul>
  );
}

export async function PartnersTemplate({ page }: { page: PageResponse }) {
  const [partners, offices, settings] = await Promise.all([
    getPartners(),
    getOffices(),
    getSettings(),
  ]);
  const jointOffices = offices.filter(({ type }) => type === 'joint');
  const sections = groupSections(page.body.blocks);
  const intro = sections.find(({ heading }) => heading === null);
  const agreements = sections.filter(({ heading }) => heading !== null);
  const [jointOfficePartnerGallery, ...agreementPartners] = partners;
  const agreementGallery = agreementPartners[0]?.gallery ?? [];

  return (
    <>
      <PageHero title={page.title} crumbs={[{ label: page.title }]} />
      {intro ? (
        <Section>
          <BlockRenderer blocks={intro.intro} />
        </Section>
      ) : null}
      {partners.map((partner, index) => (
        <Section key={partner.slug} tone={index % 2 === 0 ? 'white' : 'paper'}>
          <Heading level={2}>{partner.name}</Heading>
          <p className="mt-3 max-w-reading">{partner.description}</p>
          {partner.websiteUrl ? (
            <ButtonLink href={partner.websiteUrl} variant="link" className="mt-3">
              {text.visitWebsite(partner.name)}
            </ButtonLink>
          ) : null}
          {partner.slug === jointOfficePartnerGallery?.slug ? (
            <Gallery images={partner.gallery} />
          ) : null}
        </Section>
      ))}
      {agreements.map((section) => (
        <Section key={section.heading} tone="sand">
          <Heading level={2}>{section.heading}</Heading>
          <BlockRenderer blocks={section.intro} className="mt-3" />
          <Gallery images={agreementGallery} />
        </Section>
      ))}
      {jointOffices.length ? (
        <Section>
          <Heading level={2}>{text.jointOffice}</Heading>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {jointOffices.map((office) => (
              <li key={office.slug}>
                <Card>
                  <h3 className="text-h4">{office.name}</h3>
                  <address className="mt-2 text-small text-ink-muted not-italic">
                    {office.building ? <p>{office.building}</p> : null}
                    <p>{office.addressLine}</p>
                    <p>
                      {office.city}, {office.country}
                    </p>
                  </address>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <CtaBand settings={settings} />
    </>
  );
}
