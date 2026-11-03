import { BackendStatus } from '@/components/site/backend-status';
import { getBackendHealth } from '@/lib/api/health';
import { dictionary } from '@/lib/dictionary';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const health = await getBackendHealth();
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-navy text-3xl font-semibold">{dictionary.site.name}</h1>
      <div className="mt-4">
        <BackendStatus health={health} />
      </div>
    </main>
  );
}
