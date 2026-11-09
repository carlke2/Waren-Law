import { ROUTES, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
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
      <SiteLink
        href={ROUTES.root(insight.slug)}
        className="surface-card flex flex-col gap-4 overflow-hidden"
      >
        <InsightImage insight={insight} />
        <span className="flex flex-1 flex-col gap-3 px-5 pb-5">
          {category ? (
            <span className="text-category font-bold tracking-category text-accent-text uppercase">
              {category.name}
            </span>
          ) : null}
          <h3 className="font-heading text-h3-insight font-semibold">{insight.title}</h3>
          {insight.publishedAt ? (
            <span className="mt-auto text-date text-text-subtle">{formatDate(insight.publishedAt)}</span>
          ) : null}
        </span>
      </SiteLink>
    );
  }

  return (
    <article className="surface-card flex flex-col overflow-hidden">
      <SiteLink href={ROUTES.root(insight.slug)} className="relative block">
        <InsightImage insight={insight} />
        {category ? (
          <span className="absolute top-4 left-4 rounded-full bg-brand px-3 py-1 text-category font-bold text-on-brand">
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
        <h3 className="font-heading text-h3-insight font-semibold">
          <SiteLink href={ROUTES.root(insight.slug)} className="hover:text-accent">
            {insight.title}
          </SiteLink>
        </h3>
        <InsightAuthors authors={insight.authors} className="text-date text-text-muted" />
        {insight.excerpt ? (
          <p className="line-clamp-3 text-card-body text-text-muted">{insight.excerpt}</p>
        ) : null}
        <SiteLink href={ROUTES.root(insight.slug)} className="card-action">
          {text.readMore}
          <span aria-hidden="true">{dictionary.home.arrow}</span>
        </SiteLink>
      </div>
    </article>
  );
}

function InsightImage({ insight }: { insight: InsightSummary }) {
  const image = insight.featuredImage;
  if (image?.width && image.height) {
    return (
      <Image
        src={image.url}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={INSIGHT_IMAGE_SIZES}
        className="h-auto w-full"
      />
    );
  }
  return (
    <div className="relative aspect-insight bg-surface-alt">
      {image ? (
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={INSIGHT_IMAGE_SIZES}
          className="object-contain"
        />
      ) : null}
    </div>
  );
}
