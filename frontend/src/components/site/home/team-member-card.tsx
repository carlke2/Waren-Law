import { ROUTES, type IconName, type TeamSummary } from '@waren/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Icon, LineSvg } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { getTeamMember } from '@/lib/api/content';
import { cx } from '@/lib/utils/cx';
import { memberPhoto, type PhotoFile } from '@/lib/utils/content/photo-files';
import { dictionary } from '@/lib/utils/dictionary';
import { mailLink } from '@/lib/utils/links';

const PORTRAIT_SIZES = '(min-width: 64rem) 18rem, (min-width: 40rem) 45vw, 100vw';

interface TeamContact {
  email: string | null;
  linkedInUrl: string | null;
}

function roleIcon(role: string): IconName {
  if (/managing/i.test(role)) return 'users';
  if (/strategy|development/i.test(role)) return 'briefcase';
  if (/cross-border|global/i.test(role)) return 'globe';
  return 'scales';
}

function TeamMemberCard({
  member,
  contact,
  photos,
}: {
  member: TeamSummary;
  contact?: TeamContact;
  photos?: Record<string, PhotoFile>;
}) {
  const name = member.displayName ?? member.fullName;
  const photo = memberPhoto(member, photos);
  const profile = member.hasProfile ? ROUTES.profile(member.slug) : null;
  return (
    <article className="team-card flex h-full flex-col rounded-team border border-border bg-surface p-3 shadow-card">
      <Portrait name={name} href={profile} photo={photo} />
      <div className="flex flex-1 flex-col items-center gap-2 px-3 pt-4 pb-3 text-center">
        {profile ? (
          <SiteLink href={profile} className="font-heading text-name font-semibold text-team-heading">
            {name}
          </SiteLink>
        ) : (
          <h3 className="font-heading text-name font-semibold text-team-heading">{name}</h3>
        )}
        <p className="flex items-center justify-center gap-1.5 text-role font-normal text-team-muted">
          <Icon name={roleIcon(member.roleTitle)} className="size-4 shrink-0 text-team-accent" />
          {member.roleTitle}
        </p>
        <div className="mt-auto flex w-full flex-col items-center gap-4 pt-4">
          <span className="h-px w-full bg-team-line" />
          <SocialRow name={name} contact={contact} />
        </div>
      </div>
    </article>
  );
}

function Portrait({
  name,
  href,
  photo,
}: {
  name: string;
  href: string | null;
  photo: ReturnType<typeof memberPhoto>;
}) {
  const frame = (
    <div className="relative aspect-team overflow-hidden rounded-team-photo bg-placeholder">
      {photo ? (
        <Image
          src={photo.url}
          alt={photo.alt || name}
          fill
          sizes={PORTRAIT_SIZES}
          className="object-cover object-top"
        />
      ) : null}
    </div>
  );
  return href ? (
    <SiteLink href={href} aria-label={name} className="block">
      {frame}
    </SiteLink>
  ) : (
    frame
  );
}

function SocialRow({ name, contact }: { name: string; contact?: TeamContact }) {
  return (
    <ul className="flex min-h-9 items-center justify-center gap-2">
      {contact?.linkedInUrl ? (
        <li>
          <a
            href={contact.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={dictionary.social.open(`${dictionary.profile.linkedIn}, ${name}`)}
            className="team-social"
          >
            <LinkedInIcon />
          </a>
        </li>
      ) : null}
      {contact?.email ? (
        <li>
          <a href={mailLink(contact.email)} aria-label={`${dictionary.profile.email}, ${name}`} className="team-social">
            <MailIcon />
          </a>
        </li>
      ) : null}
    </ul>
  );
}

function LinkedInIcon() {
  return (
    <LineSvg className="size-4">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 10v7M7 7h.01M11 17v-4a2 2 0 0 1 4 0v4" />
    </LineSvg>
  );
}

function MailIcon() {
  return (
    <LineSvg className="size-4">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </LineSvg>
  );
}

async function contactsFor(
  members: readonly TeamSummary[],
): Promise<Map<string, TeamContact>> {
  const details = await Promise.all(
    members.map((member) => (member.hasProfile ? getTeamMember(member.slug) : Promise.resolve(null))),
  );
  return new Map(
    details.flatMap((member) =>
      member ? [[member.slug, { email: member.email, linkedInUrl: member.linkedInUrl }] as const] : [],
    ),
  );
}

export async function TeamCardGrid({
  members,
  photos,
  className,
}: {
  members: readonly TeamSummary[];
  photos?: Record<string, PhotoFile>;
  className?: string;
}): Promise<ReactNode> {
  const contacts = await contactsFor(members);
  return (
    <div className={cx('grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4', className)}>
      {members.map((member) => (
        <TeamMemberCard
          key={member.slug}
          member={member}
          contact={contacts.get(member.slug)}
          photos={photos}
        />
      ))}
    </div>
  );
}
