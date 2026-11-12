export interface EntityCounts {
  created: number;
  updated: number;
  unchanged: number;
}

export class ImportReport {
  readonly counts = new Map<string, EntityCounts>();
  readonly fixes = new Set<string>();
  readonly skipped: string[] = [];
  readonly warnings: string[] = [];

  private entity(name: string): EntityCounts {
    const existing = this.counts.get(name);
    if (existing) return existing;
    const created = { created: 0, updated: 0, unchanged: 0 };
    this.counts.set(name, created);
    return created;
  }

  record(name: string, outcome: keyof EntityCounts): void {
    this.entity(name)[outcome] += 1;
  }

  total(name: string): number {
    const { created, updated, unchanged } = this.entity(name);
    return created + updated + unchanged;
  }

  get changes(): number {
    return [...this.counts.values()].reduce((sum, c) => sum + c.created + c.updated, 0);
  }
}

function comparable(value: unknown): string {
  if (value === undefined || value === null) return 'null';
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return `[${value.map(comparable).join(',')}]`;
  if (typeof value === 'object') {
    if ('toFixed' in value && typeof value.toFixed === 'function') return String(value.toFixed());
    const entries = Object.entries(value)
      .filter(([, inner]) => inner !== undefined)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, inner]) => `${key}:${comparable(inner)}`);
    return `{${entries.join(',')}}`;
  }
  return JSON.stringify(value);
}

export function hasChanged(existing: object, desired: object): boolean {
  const current = existing as Record<string, unknown>;
  return Object.entries(desired).some(
    ([key, value]) => comparable(current[key]) !== comparable(value),
  );
}

interface SyncOperations<Row, Data> {
  find: () => Promise<Row | null>;
  create: (data: Data) => Promise<Row>;
  update: (row: Row, data: Data) => Promise<Row>;
}

export async function syncRecord<Row extends object, Data extends object>(
  report: ImportReport,
  entity: string,
  data: Data,
  operations: SyncOperations<Row, Data>,
): Promise<Row> {
  const existing = await operations.find();
  if (!existing) {
    report.record(entity, 'created');
    return operations.create(data);
  }
  if (!hasChanged(existing, data)) {
    report.record(entity, 'unchanged');
    return existing;
  }
  report.record(entity, 'updated');
  return operations.update(existing, data);
}

export function sameIds(a: readonly { id: string }[], b: readonly string[]): boolean {
  const current = a.map(({ id }) => id).sort();
  const desired = [...b].sort();
  return current.length === desired.length && current.every((id, i) => id === desired[i]);
}
