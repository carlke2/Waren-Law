import { ROUTES, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button-link';
import { SiteLink } from '@/components/ui/site-link';
import { memberPhoto, CARD_PHOTO } from '@/lib/utils/content/photo-files';
import { dictionary } from '@/lib/utils/dictionary';

const PORTRAIT_SIZES = '(min-width: 64rem) 16rem, 50vw';
const text = dictionary.home;

function Portrait({ name, photo }: { name: string; photo: ReturnType<typeof memberPhoto> }) {
  return (
    <div className="relative aspect-team overflow-hidden bg-surface-deep">
      {photo ? (
        <Image
          src={photo.url}
          alt={photo.alt || name}
          fill
          sizes={PORTRAIT_SIZES}
          className="object-cover object-top"
        />
      ) : (
        <span className="sr-only">{text.photoMissing}</span>
      )}
    </div>
  );
}

export function PartnersBand({ partners }: { partners: readonly TeamSummary[] }) {
  return (
    <section className="rise bg-surface-warm">
      <div className="site-container flex flex-col gap-10 py-section">
        <h2 className="font-heading text-h2 font-medium text-ink">{text.teamHeading}</h2>
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((member) => {
            const name = member.displayName ?? member.fullName;
            const photo = memberPhoto(member, CARD_PHOTO);
            const href = member.hasProfile ? ROUTES.profile(member.slug) : null;
            return (
              <li key={member.slug} className="flex flex-col gap-4">
                {href ? (
                  <SiteLink href={href} className="flex flex-col gap-4">
                    <Portrait name={name} photo={photo} />
                    <span className="font-heading text-h3-card text-ink">{name}</span>
                  </SiteLink>
                ) : (
                  <>
                    <Portrait name={name} photo={photo} />
                    <p className="font-heading text-h3-card text-ink">{name}</p>
                  </>
                )}
                <p className="text-text-body">{member.roleTitle}</p>
              </li>
            );
          })}
        </ul>
        <ButtonLink href={ROUTES.team} variant="line" className="self-start">
          {text.meetTeam}
          <span aria-hidden="true">{text.arrow}</span>
        </ButtonLink>
      </div>
    </section>
  );
}
