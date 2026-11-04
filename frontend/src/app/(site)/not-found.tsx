import { HoldingPage } from '@/components/site/holding-page';
import { dictionary } from '@/lib/dictionary';

export default function NotFound() {
  return <HoldingPage title={dictionary.notFound.title} />;
}
