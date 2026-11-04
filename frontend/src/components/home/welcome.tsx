import type { HomeResponse, ResolvedDocument } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

type Block = ResolvedDocument['blocks'][number];

function paragraphText(block: Block): string | null {
  return block.type === 'paragraph' ? block.content.map(({ text }) => text).join('') : null;
}

export function Welcome({ home }: { home: HomeResponse }) {
  const paragraphs = home.welcomeBody.blocks.flatMap((block) => paragraphText(block) ?? []);
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-wrap items-start gap-16 py-16 sm:py-28">
        <div className="flex min-w-0 flex-welcome-title flex-col gap-4">
          <Eyebrow>{dictionary.home.aboutEyebrow}</Eyebrow>
          <h2 className="font-heading text-h2 font-medium text-brand">{home.welcomeTitle}</h2>
          <span className="mt-2 h-rule w-rule-long bg-accent" />
        </div>
        <div className="flex min-w-0 flex-welcome-body flex-col gap-5 text-body text-text-body">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="mt-2">
            <ButtonLink href={ROUTES.about} variant="primary">
              {home.welcomeCtaLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
