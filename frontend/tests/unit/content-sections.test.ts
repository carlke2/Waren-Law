import { groupSections, type ContentBlock } from '@/lib/utils/content/sections';

const heading = (level: 2 | 3, text: string): ContentBlock => ({
  type: 'heading',
  level,
  content: [{ text }],
});
const paragraph = (text: string): ContentBlock => ({ type: 'paragraph', content: [{ text }] });

describe('groupSections', () => {
  it('groups H2 sections, with H3 and their text as cards', () => {
    const sections = groupSections([
      paragraph('Before'),
      heading(2, 'Values'),
      paragraph('Intro'),
      heading(3, 'Trust'),
      paragraph('Trust text'),
      heading(3, 'Mastery'),
      paragraph('Mastery text'),
      heading(2, 'Story'),
      paragraph('Story text'),
    ]);
    expect(sections.map(({ heading: title }) => title)).toEqual([null, 'Values', 'Story']);
    expect(sections[1]?.intro).toHaveLength(1);
    expect(sections[1]?.cards.map(({ title }) => title)).toEqual(['Trust', 'Mastery']);
    expect(sections[2]?.cards).toEqual([]);
  });

  it('handles a card with no section before it', () => {
    const [section] = groupSections([heading(3, 'Card'), paragraph('Text')]);
    expect(section?.heading).toBeNull();
    expect(section?.cards[0]?.blocks).toHaveLength(1);
  });
});
