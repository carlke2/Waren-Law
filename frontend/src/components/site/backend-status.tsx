import type { BackendHealth } from '@/lib/api/health';
import { dictionary } from '@/lib/dictionary';

const { backend, database, unreachable } = dictionary.backendStatus;

export function BackendStatus({ health }: { health: BackendHealth | null }) {
  if (!health) {
    return (
      <p role="status">
        {backend}: {unreachable}
      </p>
    );
  }
  return (
    <p role="status">
      {backend}: {health.status} · {database}: {health.database}
    </p>
  );
}
