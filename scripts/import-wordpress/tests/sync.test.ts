import { hasChanged, ImportReport, sameIds, syncRecord } from '../src/sync.js';

describe('hasChanged', () => {
  it('treats matching dates, nested JSON and null/undefined as unchanged', () => {
    const date = new Date('2026-01-01T00:00:00Z');
    expect(
      hasChanged(
        { a: new Date(date), b: { x: 1, y: [2] }, c: null },
        { a: date, b: { y: [2], x: 1 } },
      ),
    ).toBe(false);
  });

  it('detects a changed field', () => {
    expect(hasChanged({ a: 1 }, { a: 2 })).toBe(true);
  });
});

describe('syncRecord', () => {
  const operations = (row: { a: number } | null) => ({
    find: async () => row,
    create: vi.fn(async (data: { a: number }) => data),
    update: vi.fn(async (_row: { a: number }, data: { a: number }) => data),
  });

  it('does not write when nothing changed', async () => {
    const report = new ImportReport();
    const ops = operations({ a: 1 });
    await syncRecord(report, 'thing', { a: 1 }, ops);
    expect(ops.update).not.toHaveBeenCalled();
    expect(ops.create).not.toHaveBeenCalled();
    expect(report.changes).toBe(0);
  });

  it('creates and updates as needed', async () => {
    const report = new ImportReport();
    await syncRecord(report, 'thing', { a: 1 }, operations(null));
    await syncRecord(report, 'thing', { a: 2 }, operations({ a: 1 }));
    expect(report.counts.get('thing')).toEqual({ created: 1, updated: 1, unchanged: 0 });
  });
});

describe('sameIds', () => {
  it('ignores order', () => {
    expect(sameIds([{ id: 'b' }, { id: 'a' }], ['a', 'b'])).toBe(true);
    expect(sameIds([{ id: 'a' }], ['a', 'b'])).toBe(false);
  });
});
