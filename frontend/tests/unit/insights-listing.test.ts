import {
  categoryChips,
  insightListHref,
  pageNumbersAfterFirst,
  parsePageNumber,
  readInsightSearch,
} from '@/lib/utils/content/insights';

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

describe('insight search', () => {
  it('keeps a real practice area and category, and drops an empty form', () => {
    expect(
      readInsightSearch({ practiceArea: 'debt-recovery', category: 'conveyancing', kind: '' }),
    ).toMatchObject({
      practiceArea: 'debt-recovery',
      category: 'conveyancing',
      webinars: false,
      needsRedirect: true,
    });
    expect(insightListHref(2, { practiceArea: 'debt-recovery', category: 'conveyancing' })).toBe(
      '/insights/page/2/?practiceArea=debt-recovery&category=conveyancing',
    );
  });

  it('sends the webinar choice to the webinar list', () => {
    expect(readInsightSearch({ kind: 'webinars' }).webinars).toBe(true);
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
