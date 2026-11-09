import { ROUTES } from '@waren/shared';
import type { Metadata } from 'next';
import { TeamListing } from '@/components/site/team-listing';
import { getPracticeAreas } from '@/lib/api/content';
import { dictionary } from '@/lib/utils/dictionary';
import { deferToRequestWhenPrerenderIsSkipped, staticParams } from '@/lib/utils/prerender';
import { pageMetadata } from '@/lib/utils/seo/metadata';

const text = dictionary.team;

interface TeamAreaPageProps {
  params: Promise<{ practiceArea: string }>;
}

export function generateStaticParams() {
  return staticParams(async () =>
    (await getPracticeAreas()).map(({ slug }) => ({ practiceArea: slug })),
  );
}

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata({
    title: text.title,
    description: text.description,
    path: ROUTES.team,
    noindex: true,
  });
}

export default async function TeamAreaPage({ params }: TeamAreaPageProps) {
  await deferToRequestWhenPrerenderIsSkipped();
  return <TeamListing practiceArea={(await params).practiceArea} />;
}
