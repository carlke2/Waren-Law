import { formatDate } from '@/lib/utils/dates';

describe('formatDate', () => {
  it('uses British day-month order', () => {
    expect(formatDate('2026-06-09T00:00:00.000Z')).toBe('9 June 2026');
  });

  it('shows an event on its local date', () => {
    expect(formatDate('2026-07-29T02:00:00.000Z', 'America/Los_Angeles')).toBe('28 July 2026');
  });
});
