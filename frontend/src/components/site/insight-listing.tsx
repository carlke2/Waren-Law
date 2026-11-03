import { DEFAULT_PAGE_SIZE, ROUTES } from '@waren/shared';
import { notFound } from 'next/navigation';
import { CtaBand } from '@/components/site/cta-band';
import { InsightCard } from '@/components/site/insight-card';
import { PageHero } from '@/components/site/page-hero';
import { ButtonLink } from '@/components/ui/button';
import { FilterChips } from '@/components/ui/filter-chips';
import { Section } from '@/components/ui/layout';
import { Pagination } from '@/components/ui/pagination';
import { Lead } from '@/components/ui/typography';
import { getCategories, getInsights, getSettings } from '@/lib/api/content';
import { categoryChips } from '@/lib/content/insights';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.insights;

interface InsightListingProps {
  page: number;
  category?: { slug: string; name: string; description: string | null };
}

export async function InsightListing({ page, category }: InsightListingProps) {
  const [list, categories, settings] = await Promise.all([
    getInsights({
      page,
      pageSize: DEFAULT_PAGE_SIZE,
      ...(category ? { category: category.slug } : {}),
    }),
    getCategories(),
    getSettings(),
  ]);
  if (page > 1 && page > list.totalPages) notFound();

  const hrefFor = (target: number) =>
    category ? ROUTES.categoryPage(category.slug, target) : ROUTES.insightsPage(target);

  return (
    <>
      <PageHero
        title={category?.name ?? text.title}
        lead={category?.description ?? text.lead}
        crumbs={
          category
            ? [{ label: text.title, href: ROUTES.insights }, { label: category.name }]
            : [{ label: text.title }]
        }
      />
      <Section>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <FilterChips label={text.filterLabel} chips={categoryChips(categories, category?.slug)} />
          <ButtonLink href={ROUTES.webinars} variant="link">
            {text.webinarsLink}
          </ButtonLink>
        </div>
        {list.items.length ? (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {list.items.map((insight) => (
              <li key={insight.slug}>
                <InsightCard insight={insight} />
              </li>
            ))}
          </ul>
        ) : (
          <Lead className="mt-8">{text.empty}</Lead>
        )}
        <div className="mt-10">
          <Pagination
            current={page}
            total={list.totalPages}
            hrefFor={hrefFor}
            labels={dictionary.pagination}
          />
        </div>
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
