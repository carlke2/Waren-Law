import { ROUTES, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { formatDate } from '@/lib/utils/dates';

const INSIGHT_IMAGE_SIZES = '(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw';

export function InsightCard({ insight }: { insight: InsightSummary }) {
  const [category] = insight.categories;
  return (
    <SiteLink href={ROUTES.root(insight.slug)} className="flex flex-col gap-4.5 text-text">
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
