import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { TeamListing } from '@/components/site/team-listing';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped } from '@/lib/utils/prerender';
import { pageMetadata } from '@/lib/utils/seo/metadata';

const text = dictionary.team;

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({ title: text.title, description: text.description, path: ROUTES.team });
}

export default async function TeamPage() {
  await deferToRequestWhenPrerenderIsSkipped();
  return <TeamListing />;
}
