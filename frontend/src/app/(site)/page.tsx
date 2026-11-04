import { HoldingPage } from '@/components/site/holding-page';
import { getSettings } from '@/lib/api/content';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/prerender';

export default async function HomePage() {
  await deferToRequestWhenPrerenderIsSkipped();
  const { firm } = await getSettings();
  return <HoldingPage title={firm.name} />;
}
