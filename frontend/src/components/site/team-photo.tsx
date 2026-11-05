import { ROUTES, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import { cx } from '@/lib/utils/cx';

const GRID_SIZES = '(min-width: 64rem) 18rem, (min-width: 40rem) 45vw, 92vw';

function cutoutUrl(url: string): string {
  return url.replace(/(\.[a-zA-Z0-9]+)$/, '-cutout$1');
}

export function TeamPhoto({
  member,
  caption = true,
  linked = member.hasProfile,
  priority = false,
  sizes = GRID_SIZES,
  className,
}: {
  member: TeamSummary;
  caption?: boolean;
  linked?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const name = member.displayName ?? member.fullName;
  const body = (
    <>
      <span className="team-photo-frame">
        {member.portrait ? (
          <Image
            src={cutoutUrl(member.portrait.url)}
            alt={`Portrait of ${name}, ${member.roleTitle}`}
            fill
            sizes={sizes}
            priority={priority}
            className="team-photo-image"
          />
        ) : null}
      </span>
      {caption ? (
        <span className="flex flex-col items-center gap-1">
          <span className="font-heading text-photo-name font-medium text-on-brand">{name}</span>
          <span className="text-photo-title text-accent">{member.roleTitle}</span>
        </span>
      ) : null}
    </>
  );
  const classes = cx('team-photo', className);
  return linked ? (
    <SiteLink href={ROUTES.profile(member.slug)} className={classes}>
      {body}
    </SiteLink>
  ) : (
    <div className={classes}>{body}</div>
  );
}

export function TeamGrid({ members }: { members: readonly TeamSummary[] }): ReactNode {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <TeamPhoto key={member.slug} member={member} />
      ))}
    </div>
  );
}
