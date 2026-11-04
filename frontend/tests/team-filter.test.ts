import { parseTeamFilter, teamFilterChips } from '@/lib/content/team';

const areas = [
  {
    slug: 'mining-energy-law',
    name: 'Mining',
    shortSummary: '',
    heroImage: null,
    icon: 'briefcase' as const,
    cardTitle: '',
    shortName: '',
    cardSummary: '',
  },
  {
    slug: 'banking-finance-law',
    name: 'Banking',
    shortSummary: '',
    heroImage: null,
    icon: 'briefcase' as const,
    cardTitle: '',
    shortName: '',
    cardSummary: '',
  },
];

describe('parseTeamFilter', () => {
  it('accepts a slug and ignores anything else', () => {
    expect(parseTeamFilter('mining-energy-law')).toBe('mining-energy-law');
    expect(parseTeamFilter('<script>')).toBeUndefined();
    expect(parseTeamFilter(['a', 'b'])).toBeUndefined();
    expect(parseTeamFilter(undefined)).toBeUndefined();
  });
});

describe('teamFilterChips', () => {
  it('builds shareable links and marks All when no filter is set', () => {
    const chips = teamFilterChips(areas, undefined);
    expect(chips[0]).toMatchObject({ key: 'all', href: '/our-team/', active: true });
    expect(chips[1]).toMatchObject({
      href: '/our-team/?practiceArea=mining-energy-law',
      active: false,
    });
  });

  it('marks the active practice area', () => {
    const chips = teamFilterChips(areas, 'banking-finance-law');
    expect(chips.filter(({ active }) => active).map(({ key }) => key)).toEqual([
      'banking-finance-law',
    ]);
  });
});
