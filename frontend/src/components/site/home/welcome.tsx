import type { HomeResponse, ResolvedDocument, SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Icon, LineSvg } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';

type WhyPoint = SiteSettings['pageCopy']['about']['whyPoints'][number];

type Block = ResolvedDocument['blocks'][number];

const STATUE = '/home/lady-justice.webp';
const STATUE_SIZES = '(min-width: 64rem) 46rem, 100vw';

function paragraphText(block: Block): string | null {
  return block.type === 'paragraph' ? block.content.map(({ text }) => text).join('') : null;
}

function welcomeLines(title: string): { lead: string; name: string; tail: string } | null {
  const match = /^(.*?)\s+(WAREN)\s+(\S.*)$/i.exec(title);
  if (!match?.[1] || !match[2] || !match[3]) return null;
  return { lead: match[1], name: match[2].toUpperCase(), tail: match[3] };
}

function Handshake({ className }: { className: string }) {
  return (
    <LineSvg className={className}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </LineSvg>
  );
}

function WhyIcon({ index, className }: { index: number; className: string }) {
  if (index === 1) return <Handshake className={className} />;
  if (index === 0) return <Icon name="scales" className={className} />;
  if (index === 2) return <Icon name="shield-check" className={className} />;
  return <Icon name="globe" className={className} />;
}

export function Welcome({
  home,
  whyPoints,
}: {
  home: HomeResponse;
  whyPoints: readonly WhyPoint[];
}) {
  const paragraphs = home.welcomeBody.blocks.flatMap((block) => paragraphText(block) ?? []);
  const lines = welcomeLines(home.welcomeTitle);
  return (
    <section className="relative overflow-hidden bg-welcome">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <Image src={STATUE} alt="" fill sizes={STATUE_SIZES} className="welcome-statue" />
      </div>
      <div className="site-container relative grid items-start gap-14 py-16 sm:py-28 lg:grid-welcome lg:gap-20">
        <div className="flex min-w-0 flex-col gap-5">
          <div className="flex items-center gap-4">
            <Eyebrow>{dictionary.about.whyEyebrow}</Eyebrow>
            <span className="h-px min-w-12 flex-1 bg-accent" />
          </div>
          {lines ? (
            <h2 className="font-heading text-h2 leading-none font-bold text-brand">
              <span className="block">{lines.lead}</span>
              <span className="block text-gold-gradient">{lines.name}</span>
              <span className="block font-medium italic">{lines.tail}</span>
            </h2>
          ) : (
            <h2 className="font-heading text-h2 font-bold text-brand">{home.welcomeTitle}</h2>
          )}
          <span className="h-rule w-20 rounded-full bg-gold-gradient" />
          <div className="mt-2 flex flex-col gap-5 text-base text-brand">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-3">
            <ButtonLink href={ROUTES.about} variant="pill">
              {home.welcomeCtaLabel}
              <span aria-hidden="true">{dictionary.home.arrow}</span>
            </ButtonLink>
          </div>
        </div>
        {whyPoints.length ? (
          <ol className="divide-y divide-border">
            {whyPoints.map((point, index) => (
              <li key={point.title} className="flex items-center gap-5 py-6">
                <WhyIcon index={index} className="size-15 shrink-0 text-brand" />
                <span className="w-px self-stretch bg-accent" />
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-heading text-h3-card text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-heading text-h3-card font-semibold text-brand">{point.title}</h3>
                  </div>
                  <p className="text-card-body text-brand">{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
