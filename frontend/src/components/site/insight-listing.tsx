import { ROUTES, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SiteCta } from '@/components/home/cta-band';
import { FilterChips } from '@/components/ui/filter-chips';
import { Pagination } from '@/components/ui/pagination';
import { SiteLink } from '@/components/ui/site-link';
import { TextLink } from '@/components/ui/text-link';
import { getCategories, getInsights } from '@/lib/api/content';
import { categoryChips } from '@/lib/content/insights';
import { dictionary } from '@/lib/dictionary';
import { formatDate } from '@/lib/utils/dates';
import { InsightCard } from './insight-card';
import { NewsletterBand } from './newsletter-band';
import { PageHero } from './page-hero';

const text = dictionary.insights;
const FEATURED_IMAGE_SIZES = '(min-width: 64rem) 40rem, 100vw';

function FeaturedInsight({ insight }: { insight: InsightSummary }) {
  const [category] = insight.categories;
  return (
    <SiteLink
      href={ROUTES.root(insight.slug)}
      className="flex flex-wrap items-center gap-10 text-text"
    >
      <div className="relative aspect-insight min-w-0 flex-welcome-body bg-surface-alt">
        {insight.featuredImage ? (
          <Image
            src={insight.featuredImage.url}
            alt={insight.featuredImage.alt}
            fill
            sizes={FEATURED_IMAGE_SIZES}
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex min-w-0 flex-welcome-title flex-col gap-3.5">
        <span className="text-eyebrow font-bold tracking-eyebrow text-accent-text uppercase">
          {text.featured}
          {category ? ` · ${category.name}` : ''}
        </span>
        <h2 className="font-heading text-h2-compact font-medium text-brand">{insight.title}</h2>
        <p className="text-card-body text-text-muted">{insight.excerpt}</p>
        {insight.publishedAt ? (
          <span className="text-date text-text-subtle">{formatDate(insight.publishedAt)}</span>
        ) : null}
      </div>
    </SiteLink>
  );
}

interface InsightListingProps {
  page: number;
  category?: { slug: string; name: string; description: string | null };
}

export async function InsightListing({ page, category }: InsightListingProps) {
  const [list, categories] = await Promise.all([
    getInsights({ page, ...(category ? { category: category.slug } : {}) }),
    getCategories(),
  ]);
  if (page > 1 && page > list.totalPages) notFound();
  const showFeatured = page === 1 && !category;
  const [first, ...others] = list.items;
  const featured = showFeatured ? first : undefined;
  const grid = showFeatured ? others : list.items;
  const hrefFor = (target: number) =>
    category ? ROUTES.categoryPage(category.slug, target) : ROUTES.insightsPage(target);

  return (
    <>
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
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
          {featured ? <FeaturedInsight insight={featured} /> : null}
          <div className="flex flex-wrap items-center justify-between gap-6">
            <FilterChips
              label={text.filterLabel}
              chips={categoryChips(categories, category?.slug)}
            />
            <TextLink href={ROUTES.webinars}>
              {text.webinarsLink} {dictionary.home.arrow}
            </TextLink>
          </div>
          {list.items.length ? (
            <div className="grid grid-auto-insight gap-7 lg:grid-cols-3">
              {grid.map((insight) => (
                <InsightCard key={insight.slug} insight={insight} />
              ))}
            </div>
          ) : (
            <p className="text-intro text-text-muted">{text.empty}</p>
          )}
          <Pagination current={page} total={list.totalPages} hrefFor={hrefFor} />
        </div>
      </section>
      <NewsletterBand />
      <SiteCta />
    </>
  );
}
