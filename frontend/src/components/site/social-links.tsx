import type { SiteSettings } from '@waren/shared';
import { LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';
import { cx } from '@/lib/utils/cx';

const text = dictionary.social;

const LINKS = [
  ['facebook', text.facebook],
  ['instagram', text.instagram],
  ['linkedIn', text.linkedIn],
  ['youtube', text.youtube],
] as const;

function SocialIcon({ name }: { name: (typeof LINKS)[number][0] }) {
  if (name === 'facebook') {
    return (
      <LineSvg className="size-4">
        <path d="M14 8h2V4h-2a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1z" />
      </LineSvg>
    );
  }
  if (name === 'instagram') {
    return (
      <LineSvg className="size-4">
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </LineSvg>
    );
  }
  if (name === 'linkedIn') {
    return (
      <LineSvg className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7M7 7h.01M11 17v-4a2 2 0 0 1 4 0v4" />
      </LineSvg>
    );
  }
  return (
    <LineSvg className="size-4">
      <path d="M22 12.5a10 10 0 1 1-3.2-7.4" />
      <path d="M14 10.5v6l5-3-5-3z" />
    </LineSvg>
  );
}

export function SocialLinks({
  socials,
  className,
  tone = 'onBrand',
}: {
  socials: SiteSettings['socials'];
  className?: string;
  tone?: 'onBrand' | 'card';
}) {
  const linkClass =
    tone === 'card'
      ? 'team-social'
      : 'inline-flex size-11 items-center justify-center text-on-brand hover:text-accent';
  return (
    <ul className={cx('flex items-center', tone === 'card' && 'gap-2', className)}>
      {LINKS.map(([key, label]) => (
        <li key={key}>
          <a
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={text.open(label)}
            className={linkClass}
          >
            <SocialIcon name={key} />
          </a>
        </li>
      ))}
    </ul>
  );
}
