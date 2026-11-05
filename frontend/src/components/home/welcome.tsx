import type { HomeResponse, ResolvedDocument, SiteSettings } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

type WhyPoint = SiteSettings['pageCopy']['about']['whyPoints'][number];

type Block = ResolvedDocument['blocks'][number];

function paragraphText(block: Block): string | null {
  return block.type === 'paragraph' ? block.content.map(({ text }) => text).join('') : null;
}

export function Welcome({
  home,
  whyPoints,
}: {
  home: HomeResponse;
  whyPoints: readonly WhyPoint[];
}) {
  const paragraphs = home.welcomeBody.blocks.flatMap((block) => paragraphText(block) ?? []);
  return (
    <section className="bg-surface-alt">
      <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
        <div className="flex min-w-0 flex-welcome-title flex-col gap-4">
          <Eyebrow>{dictionary.about.whyEyebrow}</Eyebrow>
          <h2 className="font-heading text-h2 font-medium text-brand">{home.welcomeTitle}</h2>
          <span className="mt-2 h-rule w-rule-long bg-accent" />
          <div className="mt-4 flex flex-col gap-5 text-body text-text-body">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-2">
            <ButtonLink href={ROUTES.about} variant="primary">
              {home.welcomeCtaLabel}
            </ButtonLink>
          </div>
        </div>
        {whyPoints.length ? (
          <ol className="flex min-w-0 flex-welcome-body flex-col gap-6">
            {whyPoints.map((point, index) => (
              <li key={point.title} className="border-t-2 border-brand pt-5">
                <span className="text-eyebrow font-bold text-accent-text">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-2 font-heading text-h3-card font-semibold text-brand">
                  {point.title}
                </h3>
                <p className="mt-2 text-card-body text-text-muted">{point.text}</p>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
