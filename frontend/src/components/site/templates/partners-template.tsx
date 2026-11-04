import { ROUTES, type PageResponse } from '@waren/shared';
import Image from 'next/image';
import { SiteCta } from '@/components/home/cta-band';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SectionHeading } from '@/components/ui/section-heading';
import { TextLink } from '@/components/ui/text-link';
import { getOffices, getPartners, getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { PageHero } from '../page-hero';

const text = dictionary.partners;
const JOINT_OFFICE = 'joint';
const GALLERY_LIMIT = 6;
const GALLERY_SIZES = '(min-width: 64rem) 24rem, (min-width: 40rem) 50vw, 100vw';

const hostOf = (url: string) => new URL(url).hostname.replace(/^(www|en)\./, '');

export async function PartnersTemplate({ page }: { page: PageResponse }) {
  const [settings, partners, offices] = await Promise.all([
    getSettings(),
    getPartners(),
    getOffices(),
  ]);
  const copy = settings.pageCopy.partners;
  const office = offices.find(({ type }) => type === JOINT_OFFICE);
  const photos = [
    ...new Map(
      partners.flatMap(({ gallery }) => gallery).map((photo) => [photo.url, photo]),
    ).values(),
  ].slice(0, GALLERY_LIMIT);

  return (
    <>
      <PageHero
        title={copy.heroTitle}
        eyebrow={dictionary.about.eyebrow}
        intro={copy.heroIntro}
        crumbs={[{ label: page.title }]}
      />

      <section className="bg-surface">
        <div className="site-container-narrow flex flex-col gap-4 pt-16 pb-16 sm:pt-26">
          <Eyebrow>{text.introEyebrow}</Eyebrow>
          <h2 className="font-heading text-h2 font-medium text-brand">{copy.introTitle}</h2>
          <p className="max-w-h1 text-body text-text-body">{copy.intro}</p>
          <div className="mt-6 border-t border-border">
            {partners.map(({ slug, name, description, websiteUrl }) => (
              <div
                key={slug}
                className="flex flex-wrap items-center gap-8 border-b border-border py-9"
              >
                <div className="flex min-w-0 flex-recognition flex-col gap-2">
                  <h3 className="font-heading text-h3-row font-semibold text-brand">{name}</h3>
                  <p className="text-text-muted">{copy.firmNotes[slug] ?? description}</p>
                </div>
                {websiteUrl ? (
                  <TextLink href={websiteUrl} external>
                    {hostOf(websiteUrl)} {text.externalArrow}
                  </TextLink>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {office ? (
        <section data-tone="dark" className="bg-brand text-on-brand">
          <div className="site-container-narrow flex flex-col gap-3.5 py-16 sm:py-24">
            <SectionHeading eyebrow={text.jointOfficeEyebrow} title={office.city} onBrand />
            <p className="max-w-h1 text-intro text-on-brand-muted">
              {[office.addressLine, office.building, office.city].filter(Boolean).join(', ')}
            </p>
            <div className="mt-2">
              <ButtonLink href={ROUTES.contact} variant="gold">
                {text.contactOffice(office.city)}
              </ButtonLink>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface-alt">
        <div className="site-container-narrow flex flex-col gap-9 py-16 sm:py-26">
          <div className="flex max-w-h1 flex-col gap-3">
            <SectionHeading eyebrow={copy.signingLabel} title={copy.signingTitle} />
            <p className="text-body text-text-body">{copy.signingText}</p>
          </div>
          {photos.length ? (
            <div className="grid grid-auto-practice gap-4 lg:grid-cols-3">
              {photos.map((photo) => (
                <div key={photo.url} className="relative aspect-photo bg-surface">
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    sizes={GALLERY_SIZES}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
          <div>
            <TextLink href={ROUTES.root(copy.signingInsightSlug)}>
              {text.readAnnouncement} {dictionary.home.arrow}
            </TextLink>
          </div>
        </div>
      </section>

      <SiteCta />
    </>
  );
}
