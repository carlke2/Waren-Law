import { Card } from '@/components/ui/card';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import type { ContentSection } from '@/lib/content/sections';
import { BlockRenderer } from './block-renderer';

type Tone = 'paper' | 'white' | 'sand';

export function ContentSectionBlock({
  section,
  tone = 'paper',
}: {
  section: ContentSection;
  tone?: Tone;
}) {
  const { heading, intro, cards } = section;
  return (
    <Section tone={tone}>
      {heading ? <Heading level={2}>{heading}</Heading> : null}
      {intro.length ? <BlockRenderer blocks={intro} className={heading ? 'mt-4' : ''} /> : null}
      {cards.length ? (
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4 [&:has(>li:nth-child(2):last-child)]:lg:grid-cols-2 [&:has(>li:nth-child(3):last-child)]:lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.title}>
              <Card className="h-full border-t-2 border-t-gold-500">
                <Heading level={3} size="h4">
                  {card.title}
                </Heading>
                <BlockRenderer blocks={card.blocks} className="mt-2 text-small" />
              </Card>
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  );
}

const TONES: readonly Tone[] = ['paper', 'white'];

export function ContentSections({
  sections,
  startTone = 0,
}: {
  sections: readonly ContentSection[];
  startTone?: number;
}) {
  return sections.map((section, index) => (
    <ContentSectionBlock
      key={section.heading ?? index}
      section={section}
      tone={TONES[(index + startTone) % TONES.length]}
    />
  ));
}
