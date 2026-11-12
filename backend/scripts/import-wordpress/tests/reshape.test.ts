import type { Block } from '@waren/shared';
import { closeHeadingGaps } from '../src/blocks.js';
import { reshapeWebinarBody } from '../src/importers/webinars.js';
import type { ParsedBlock } from '../src/html-to-blocks.js';

type TextBlock = Exclude<Block, { type: 'image' }>;

const h = (level: 2 | 3 | 4, text: string): TextBlock => ({
  type: 'heading',
  level,
  content: [{ text }],
});
const p = (text: string): TextBlock => ({ type: 'paragraph', content: [{ text }] });

describe('closeHeadingGaps', () => {
  it('lowers a heading that skips a level', () => {
    const levels = closeHeadingGaps([h(4, 'a'), h(2, 'b'), h(4, 'c'), h(3, 'd')]).map((block) =>
      block.type === 'heading' ? block.level : 0,
    );
    expect(levels).toEqual([2, 2, 3, 3]);
  });
});

describe('reshapeWebinarBody', () => {
  const blocks: ParsedBlock[] = [
    h(2, 'About'),
    p('Summary'),
    h(2, 'Who should attend'),
    h(3, 'Audience line'),
    h(4, 'Group'),
    p('Group text'),
  ];

  it('removes the summary, and its heading when nothing else is under it', () => {
    const result = reshapeWebinarBody(blocks, 0, 2);
    expect(result[0]).toEqual(h(2, 'Who should attend'));
  });

  it('keeps the heading when more text follows the summary', () => {
    const withMore: ParsedBlock[] = [h(2, 'About'), p('Summary'), p('More'), h(2, 'Next')];
    expect(reshapeWebinarBody(withMore, 0, -1)).toEqual([h(2, 'About'), p('More'), h(2, 'Next')]);
  });

  it('turns the audience line into text and sub-headings into cards', () => {
    const result = reshapeWebinarBody(blocks, 0, 2);
    expect(result[1]).toEqual({ type: 'paragraph', content: [{ text: 'Audience line' }] });
    expect(result[2]).toEqual(h(3, 'Group'));
  });
});
