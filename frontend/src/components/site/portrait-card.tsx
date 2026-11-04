import { ROUTES, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { SiteLink } from '@/components/ui/site-link';

const PORTRAIT_SIZES = '(min-width: 64rem) 19rem, 50vw';
const CARD = 'flex flex-col bg-brand-soft text-on-brand';

function CardBody({ member }: { member: TeamSummary }) {
  return (
    <>
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
    </>
  );
}

export function PortraitCard({ member }: { member: TeamSummary }) {
  return member.hasProfile ? (
    <SiteLink href={ROUTES.profile(member.slug)} className={CARD}>
      <CardBody member={member} />
    </SiteLink>
  ) : (
    <div className={CARD}>
      <CardBody member={member} />
    </div>
  );
}

export function PortraitGrid({ members }: { members: readonly TeamSummary[] }): ReactNode {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-auto-team sm:gap-6 lg:grid-cols-4">
      {members.map((member) => (
        <PortraitCard key={member.slug} member={member} />
      ))}
    </div>
  );
}
