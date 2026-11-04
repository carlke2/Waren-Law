import { PageHero } from './page-hero';

export function HoldingPage({ title }: { title: string }) {
  return <PageHero title={title} crumbs={[{ label: title }]} />;
}
