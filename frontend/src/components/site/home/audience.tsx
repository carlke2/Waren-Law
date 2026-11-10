import type { HeroCard } from '@waren/shared';
import { Icon } from '@/components/ui/icon';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { CARD_HOVER_LINE } from './home-links';
import { SectionHeading } from './section-heading';

const text = dictionary.home;

function AudienceCard({ card }: { card: HeroCard }) {
  return (
    <SiteLink href={card.href} className="surface-card group flex flex-col gap-4 p-6">
      <span className="icon-badge">
        <Icon name={card.icon} className="size-6" />
      </span>
      <h3 className="font-heading text-h3-card font-semibold group-hover:underline">
        {card.title}
      </h3>
      <p className="text-card-body text-text-muted">{card.text}</p>
      <span
        aria-hidden="true"
        className="mt-auto inline-block text-h3-card text-brand transition-transform group-hover:translate-x-1"
      >
        {text.arrow}
      </span>
    </SiteLink>
  );
}

export function Audience({ cards }: { cards: readonly HeroCard[] }) {
  return (
    <HomeSection tone="tint">
      <SectionHeading title={text.audienceEyebrow} centred />
      <div className={`grid grid-cols-1 gap-6 md:grid-cols-3 ${CARD_HOVER_LINE}`}>
        {cards.map((card) => (
          <AudienceCard key={card.title} card={card} />
        ))}
      </div>
    </HomeSection>
  );
}
