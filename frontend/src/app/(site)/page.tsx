import { getSettings } from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const { firm } = await getSettings();
  return (
    <main>
      <h1>{firm.name}</h1>
    </main>
  );
}
