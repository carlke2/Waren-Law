import { categoryChips, pageNumbersAfterFirst, parsePageNumber } from '@/lib/content/insights';

describe('parsePageNumber', () => {
  it('accepts positive whole numbers only', () => {
    expect(parsePageNumber('3')).toBe(3);
    expect(parsePageNumber('0')).toBeNull();
    expect(parsePageNumber('-1')).toBeNull();
    expect(parsePageNumber('2x')).toBeNull();
    expect(parsePageNumber('01')).toBeNull();
  });
});

describe('pageNumbersAfterFirst', () => {
  it('lists the pages after page one', () => {
    expect(pageNumbersAfterFirst(32)).toEqual([2, 3]);
    expect(pageNumbersAfterFirst(12)).toEqual([]);
    expect(pageNumbersAfterFirst(0)).toEqual([]);
  });
});

describe('categoryChips', () => {
  const categories = [
    { slug: 'debt-recovery', name: 'Debt', description: null, insightCount: 4 },
    { slug: 'regulatory-services', name: 'Regulatory', description: null, insightCount: 0 },
  ];

  it('leaves out empty categories and marks the active one', () => {
    const chips = categoryChips(categories, 'debt-recovery');
    expect(chips.map(({ key }) => key)).toEqual(['all', 'debt-recovery']);
    expect(chips[1]?.active).toBe(true);
    expect(chips[1]?.href).toBe('/category/debt-recovery/');
  });
});
