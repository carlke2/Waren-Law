import { ROUTES, type HeroCard } from '@waren/shared';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';
import { Audience } from './audience';

export const HOME_INTRO_ID = 'intro';

interface HomeIntroProps {
  title: string;
  description: string;
  bookingLabel: string;
  cards: readonly HeroCard[];
}

export function HomeIntro({ title, description, bookingLabel, cards }: HomeIntroProps) {
  return (
    <section id={HOME_INTRO_ID} className="scroll-mt-header bg-surface">
      <div className="site-container py-16 sm:py-28">
        <div className="flex max-w-reading flex-col gap-5">
          {title ? (
            <h1 className="font-heading text-h1-page font-medium text-balance text-brand">
              {title}
            </h1>
          ) : null}
          {description ? <p className="text-lead text-text-body">{description}</p> : null}
          <div className="mt-2 flex flex-wrap gap-3.5">
            <ButtonLink href={ROUTES.consultation} variant="gold">
              {bookingLabel}
            </ButtonLink>
            <ButtonLink href={ROUTES.expertise} variant="primary">
              {dictionary.home.heroServices}
            </ButtonLink>
          </div>
        </div>
      </div>
      <Audience cards={cards} />
    </section>
  );
}
