import { ROUTES, type HomeResponse, type ResolvedDocument } from '@waren/shared';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { OutlineLink } from './home-links';
import { HomeEyebrow } from './section-heading';

export const HOME_INTRO_ID = 'intro';

const IMAGE_SIZES = '(min-width: 64rem) 40rem, 100vw';

type Block = ResolvedDocument['blocks'][number];

function paragraphText(block: Block): string | null {
  return block.type === 'paragraph' ? block.content.map(({ text }) => text).join('') : null;
}

interface WelcomeProps {
  home: HomeResponse;
  tagline: string;
  bookingLabel: string;
}

export function Welcome({ home, tagline, bookingLabel }: WelcomeProps) {
  const paragraphs = home.welcomeBody.blocks.flatMap((block) => paragraphText(block) ?? []);
  return (
    <HomeSection tone="plain" id={HOME_INTRO_ID}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex min-w-0 flex-col gap-5">
          <HomeEyebrow>{dictionary.home.aboutEyebrow}</HomeEyebrow>
          <h2 className="font-heading text-h2 font-medium text-balance text-brand">
            {home.welcomeTitle}
          </h2>
          <span className="h-rule w-rule-long bg-accent" />
          {tagline ? <p className="text-lead text-brand">{tagline}</p> : null}
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-base text-text-body">
              {paragraph}
            </p>
          ))}
          <div className="mt-3 flex flex-wrap gap-3.5">
            <ButtonLink href={ROUTES.consultation} variant="primary">
              {bookingLabel}
            </ButtonLink>
            <OutlineLink href={ROUTES.about}>{home.welcomeCtaLabel}</OutlineLink>
          </div>
        </div>
        <div className="relative aspect-insight overflow-hidden rounded-card">
          <Image
            src={home.heroImage.url}
            alt={home.heroImage.alt}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover"
          />
        </div>
      </div>
    </HomeSection>
  );
}
