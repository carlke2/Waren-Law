import { ROUTES, type HomeResponse, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;
const PORTRAIT_SIZES = '(min-width: 64rem) 19rem, 50vw';

function PartnerCard({ member }: { member: TeamSummary }) {
  return (
    <SiteLink
      href={ROUTES.profile(member.slug)}
      className="flex flex-col bg-brand-soft text-on-brand"
    >
      <div className="relative aspect-portrait bg-placeholder">
        {member.portrait ? (
          <Image
            src={member.portrait.url}
            alt={member.portrait.alt}
            fill
            sizes={PORTRAIT_SIZES}
            className="object-cover object-top"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-1 px-2.5 pt-3 pb-4 text-center sm:px-5.5 sm:pt-5.5 sm:pb-6.5">
        <span className="font-heading text-name-phone font-medium sm:text-name">
          {member.displayName ?? member.fullName}
        </span>
        <span className="text-role-phone text-accent sm:text-role">{member.roleTitle}</span>
      </div>
    </SiteLink>
  );
}

interface PartnersBandProps {
  home: HomeResponse;
  partners: readonly TeamSummary[];
}

export function PartnersBand({ home, partners }: PartnersBandProps) {
  return (
    <section data-tone="dark" className="bg-brand text-on-brand">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-22 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-section-header flex-col gap-3">
            <div className="flex items-center gap-3.5">
              <span className="h-rule w-rule-short bg-accent" />
              <Eyebrow onBrand>{text.teamEyebrow}</Eyebrow>
            </div>
            <h2 className="font-heading text-h2 font-medium">{home.teamTitle}</h2>
            <p className="text-intro text-on-brand-muted">{home.teamIntro}</p>
          </div>
          <ButtonLink href={ROUTES.team} variant="outline">
            {text.allPeople}
          </ButtonLink>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-auto-team sm:gap-6 lg:grid-cols-4">
          {partners.map((member) => (
            <PartnerCard key={member.slug} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
