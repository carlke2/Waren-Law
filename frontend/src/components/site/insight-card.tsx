import type { InsightSummary } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { formatDate } from '@/lib/utils/dates';

const CARD_IMAGE_SIZES = '(min-width: 64rem) 24rem, (min-width: 48rem) 50vw, 100vw';

export function InsightCard({ insight }: { insight: InsightSummary }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-md border border-line bg-surface">
      {insight.featuredImage ? (
        <Image
          src={insight.featuredImage.url}
          alt={insight.featuredImage.alt}
          width={insight.featuredImage.width ?? undefined}
          height={insight.featuredImage.height ?? undefined}
          sizes={CARD_IMAGE_SIZES}
          className="aspect-feature w-full object-cover"
        />
      ) : null}
      <div className="flex grow flex-col p-5">
        <p className="text-caption text-ink-muted">
          {insight.publishedAt ? formatDate(insight.publishedAt) : null}
          {insight.publishedAt ? ' · ' : null}
          {dictionary.insights.readingTime(insight.readingMinutes)}
        </p>
        <h3 className="mt-2 text-h4">
          <Link href={ROUTES.root(insight.slug)} className="hover:underline underline-offset-4">
            {insight.title}
          </Link>
        </h3>
        {insight.categories.length ? (
          <p className="mt-auto pt-3 text-caption text-gold-700">
            {insight.categories.map(({ name }) => name).join(' · ')}
          </p>
        ) : null}
      </div>
    </article>
  );
}
