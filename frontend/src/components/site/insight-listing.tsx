import { ROUTES } from '@waren/shared';
import { notFound } from 'next/navigation';
import { SiteCta } from '@/components/site/home/cta-band';
import { Pagination } from '@/components/ui/pagination';
import { getCategories, getHome, getInsights, getPracticeAreas } from '@/lib/api/content';
import { insightListHref, type InsightListFilters } from '@/lib/utils/content/insights';
import { dictionary } from '@/lib/utils/dictionary';
import { serverEnv } from '@/lib/utils/env';
import { breadcrumbSchema } from '@/lib/utils/seo/schema';
import { InsightCard } from './insight-card';
import { InsightFilters } from './insight-filters';
import { InsightSpotlight } from './insight-spotlight';
import { JsonLd } from './json-ld';
import { PageHero } from './page-hero';

const text = dictionary.insights;
const SPOTLIGHT_COUNT = 3;

interface InsightListingProps {
  page: number;
  category?: { slug: string; name: string; description: string | null };
  practiceArea?: string;
  queryCategory?: string;
}

export async function InsightListing({
  page,
  category,
  practiceArea,
  queryCategory,
}: InsightListingProps) {
  const categorySlug = category?.slug ?? queryCategory;
  const [list, categories, practiceAreas, home] = await Promise.all([
    getInsights({
      page,
      ...(categorySlug ? { category: categorySlug } : {}),
      ...(practiceArea ? { practiceArea } : {}),
    }),
    getCategories(),
    getPracticeAreas(),
    getHome(),
  ]);
  if (page > 1 && page > list.totalPages) notFound();
  const showSpotlight = page === 1 && !categorySlug && !practiceArea && list.items.length > 0;
  const spotlight = showSpotlight ? list.items.slice(0, SPOTLIGHT_COUNT) : [];
  const grid = showSpotlight ? list.items.slice(spotlight.length) : list.items;
  const filters: InsightListFilters = {
    ...(practiceArea ? { practiceArea } : {}),
    ...(categorySlug ? { category: categorySlug, categoryInPath: Boolean(category) } : {}),
  };
  const crumbs = category
    ? [
        { label: dictionary.common.home, href: ROUTES.home },
        { label: text.title, href: ROUTES.insights },
        { label: category.name },
      ]
    : [{ label: dictionary.common.home, href: ROUTES.home }, { label: text.title }];

  return (
    <>
      {showSpotlight ? (
        <>
          <JsonLd data={breadcrumbSchema(crumbs, serverEnv().siteUrl)} />
          <InsightSpotlight slides={spotlight} />
        </>
      ) : (
        <PageHero
          title={category?.name ?? text.title}
          eyebrow={dictionary.home.insightsEyebrow}
          intro={category?.description ?? text.lead}
          crumbs={
            category
              ? [{ label: text.title, href: ROUTES.insights }, { label: category.name }]
              : [{ label: text.title }]
          }
        />
      )}
      <InsightFilters
        categories={categories}
        practiceAreas={practiceAreas}
        practiceArea={practiceArea}
        category={categorySlug}
      />
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
          {grid.length ? (
            <>
              <h2 className="text-center font-heading text-h2 font-medium text-brand">
                {home?.insightsTitle ?? text.title}
              </h2>
              <div className="grid grid-auto-insight gap-7 lg:grid-cols-3">
                {grid.map((insight) => (
                  <InsightCard key={insight.slug} insight={insight} variant="news" />
                ))}
              </div>
            </>
          ) : showSpotlight ? null : (
            <p className="text-intro text-text-muted">{text.empty}</p>
          )}
          <Pagination
            current={page}
            total={list.totalPages}
            hrefFor={(target) => insightListHref(target, filters)}
          />
        </div>
      </section>
      <SiteCta />
    </>
  );
}
