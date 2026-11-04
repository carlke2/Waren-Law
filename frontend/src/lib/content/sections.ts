import type { ResolvedDocument } from '@waren/shared';

export type ContentBlock = ResolvedDocument['blocks'][number];

type HeadingBlock = Extract<ContentBlock, { type: 'heading' }>;

export interface ContentCard {
  title: string;
  blocks: ContentBlock[];
}

export interface ContentSection {
  heading: string | null;
  intro: ContentBlock[];
  cards: ContentCard[];
}

export function inlineToText(block: HeadingBlock | { content: { text: string }[] }): string {
  return block.content.map(({ text }) => text).join('');
}

function isHeading(block: ContentBlock, level: number): block is HeadingBlock {
  return block.type === 'heading' && block.level === level;
}

export function groupSections(blocks: readonly ContentBlock[]): ContentSection[] {
  const sections: ContentSection[] = [];
  let section: ContentSection | undefined;
  let card: ContentCard | undefined;

  const currentSection = (): ContentSection => {
    if (!section) {
      section = { heading: null, intro: [], cards: [] };
      sections.push(section);
    }
    return section;
  };

  for (const block of blocks) {
    if (isHeading(block, 2)) {
      section = { heading: inlineToText(block), intro: [], cards: [] };
      sections.push(section);
      card = undefined;
    } else if (isHeading(block, 3)) {
      card = { title: inlineToText(block), blocks: [] };
      currentSection().cards.push(card);
    } else if (card) {
      card.blocks.push(block);
    } else {
      currentSection().intro.push(block);
    }
  }
  return sections;
}
