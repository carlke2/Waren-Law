import type { TeamSummary } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';

const CARD_IMAGE_SIZES = '(min-width: 64rem) 18rem, (min-width: 48rem) 33vw, 50vw';

export function TeamCard({ member }: { member: TeamSummary }) {
  const name = member.displayName ?? member.fullName;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface">
      {member.portrait ? (
        <Image
          src={member.portrait.url}
          alt={member.portrait.alt}
          width={member.portrait.width ?? undefined}
          height={member.portrait.height ?? undefined}
          sizes={CARD_IMAGE_SIZES}
          className="aspect-portrait w-full object-cover object-top"
        />
      ) : null}
      <div className="flex grow flex-col p-4">
        <h3 className="text-h4">
          {member.hasProfile ? (
            <Link href={ROUTES.profile(member.slug)} className="hover:underline underline-offset-4">
              {name}
            </Link>
          ) : (
            name
          )}
        </h3>
        <p className="mt-1 text-small text-ink-muted">{member.roleTitle}</p>
        {member.practiceAreas.length ? (
          <p className="mt-2 text-caption text-gold-700">
            <span className="sr-only">{dictionary.team.practiceAreas}: </span>
            {member.practiceAreas.map(({ name: areaName }) => areaName).join(' · ')}
          </p>
        ) : null}
      </div>
    </article>
  );
}
