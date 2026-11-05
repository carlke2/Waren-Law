import type { HeroCard } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { Icon } from '@/components/ui/icon';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.home;

function AudienceCard({ card }: { card: HeroCard }) {
  return (
    <SiteLink
      href={card.href}
      className="flex flex-col items-center gap-3 border border-b-card-rule border-border border-b-brand bg-surface px-6 py-8 text-center text-text"
    >
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-border text-brand">
        <Icon name={card.icon} className="size-6" />
      </span>
      <h3 className="font-heading text-h3-card font-semibold text-brand">{card.title}</h3>
      <p className="text-card-body text-text-muted">{card.text}</p>
      <span className="mt-auto text-link font-bold tracking-hero-button text-brand uppercase">
        {text.heroCardButton}
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
        <div className="grid grid-auto-hero gap-6">
          {cards.map((card) => (
            <AudienceCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
