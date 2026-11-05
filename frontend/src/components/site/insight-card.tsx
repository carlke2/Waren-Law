import { ROUTES, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';
import { formatDate } from '@/lib/utils/dates';
import { InsightAuthors } from './insight-authors';

const INSIGHT_IMAGE_SIZES = '(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw';
const text = dictionary.insights;

export function InsightCard({
  insight,
  variant = 'compact',
}: {
  insight: InsightSummary;
  variant?: 'compact' | 'news';
}) {
  const [category] = insight.categories;
  if (variant === 'compact') {
    return (
      <SiteLink href={ROUTES.root(insight.slug)} className="flex flex-col gap-4.5 text-text">
        <InsightImage insight={insight} />
        {category ? (
          <span className="text-category font-bold tracking-category text-accent-text uppercase">
            {category.name}
          </span>
        ) : null}
        <h3 className="font-heading text-h3-insight font-semibold text-brand">{insight.title}</h3>
        {insight.publishedAt ? (
          <span className="text-date text-text-subtle">{formatDate(insight.publishedAt)}</span>
        ) : null}
      </SiteLink>
    );
  }

  return (
    <article className="flex h-full flex-col border border-border bg-surface">
      <SiteLink href={ROUTES.root(insight.slug)} className="relative block">
        <InsightImage insight={insight} />
        {category ? (
          <span className="absolute top-0 left-0 bg-brand px-3 py-1.5 text-category font-bold text-on-brand">
            {category.name}
          </span>
        ) : null}
      </SiteLink>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-date text-text-subtle">
          {text.readingTime(insight.readingMinutes)}
          {insight.categories.length
            ? ` | ${insight.categories.map(({ name }) => name).join(', ')}`
            : ''}
        </p>
        <h3 className="font-heading text-h3-insight font-semibold text-brand">
          <SiteLink href={ROUTES.root(insight.slug)} className="hover:text-accent">
            {insight.title}
          </SiteLink>
        </h3>
        <InsightAuthors authors={insight.authors} className="text-date text-text-muted" />
        {insight.excerpt ? (
          <p className="line-clamp-3 text-card-body text-text-muted">{insight.excerpt}</p>
        ) : null}
        <SiteLink
          href={ROUTES.root(insight.slug)}
          className="mt-auto inline-block self-start bg-accent px-4 py-2 text-button font-bold text-on-accent"
        >
          {text.readMore}
        </SiteLink>
      </div>
    </article>
  );
}

function InsightImage({ insight }: { insight: InsightSummary }) {
  return (
    <div className="relative aspect-insight bg-surface-alt">
      {insight.featuredImage ? (
        <Image
          src={insight.featuredImage.url}
          alt={insight.featuredImage.alt}
          fill
          sizes={INSIGHT_IMAGE_SIZES}
          className="object-cover"
        />
      ) : null}
    </div>
  );
}
