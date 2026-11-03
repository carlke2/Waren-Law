import { dictionary } from '@/lib/dictionary';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-lead p-8">
      <h1 className="text-h1">{dictionary.common.home}</h1>
    </main>
  );
}
