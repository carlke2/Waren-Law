import type { HeroCard } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { Icon } from '@/components/ui/icon';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.home;

function AudienceCard({ card }: { card: HeroCard }) {
  return (
    <SiteLink href={card.href} className="surface-card group flex flex-col items-center gap-4 p-6 text-center">
      <span className="icon-badge">
        <Icon name={card.icon} className="size-6" />
      </span>
      <h3 className="font-heading text-h3-card font-semibold">{card.title}</h3>
      <p className="text-card-body text-text-muted">{card.text}</p>
      <span className="card-action self-center">
        {text.heroCardButton}
        <span
          aria-hidden="true"
          className="inline-block normal-case transition-transform group-hover:translate-x-1"
        >
          {text.arrow}
        </span>
      </span>
    </SiteLink>
  );
}

export function Audience({ cards }: { cards: readonly HeroCard[] }) {
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-col gap-10 py-16 sm:py-28">
        <h2 className="text-center font-heading text-h2 font-medium text-brand">
          {text.audienceEyebrow}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <AudienceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
