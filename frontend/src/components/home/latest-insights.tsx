import { ROUTES, type HomeResponse, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { Eyebrow } from '@/components/ui/eyebrow';
import { formatDate } from '@/lib/utils/dates';

const text = dictionary.home;
const INSIGHT_IMAGE_SIZES = '(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw';

function InsightCard({ insight }: { insight: InsightSummary }) {
  const [category] = insight.categories;
  return (
    <Link href={ROUTES.root(insight.slug)} className="flex flex-col gap-4.5 text-text">
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
    </Link>
  );
}

interface LatestInsightsProps {
  home: HomeResponse;
  insights: readonly InsightSummary[];
}

export function LatestInsights({ home, insights }: LatestInsightsProps) {
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-22 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>{text.insightsEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{home.insightsTitle}</h2>
          </div>
          <Link
            href={ROUTES.insights}
            className="inline-flex items-center border-b-2 border-accent pb-1 text-button font-bold text-brand max-sm:min-h-11"
          >
            {text.allInsights} {text.arrow}
          </Link>
        </div>
        <div className="grid grid-auto-insight gap-7">
          {insights.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>
      </div>
    </section>
  );
}
