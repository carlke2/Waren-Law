export type PageItem = number | 'gap';

const SIBLINGS = 1;

export function pageItems(current: number, total: number): PageItem[] {
  const pages = new Set(
    [
      1,
      total,
      current,
      ...Array.from(
        { length: SIBLINGS * 2 },
        (_, i) => current - SIBLINGS + (i < SIBLINGS ? i : i + 1),
      ),
    ].filter((page) => page >= 1 && page <= total),
  );
  const sorted = [...pages].sort((a, b) => a - b);
  return sorted.flatMap((page, index) => {
    const previous = sorted[index - 1];
    return previous !== undefined && page - previous > 1 ? (['gap', page] as PageItem[]) : [page];
  });
}
