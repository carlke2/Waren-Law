import { ROUTES, type HomeResponse, type InsightSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';

const FRAMES = ['aspect-insight-short', 'aspect-insight-mid', 'aspect-insight-tall'] as const;
const INSIGHT_SIZES = '(min-width: 64rem) 24rem, 100vw';
const text = dictionary.home;

export function LatestInsights({
  home,
  insights,
}: {
  home: HomeResponse;
  insights: readonly InsightSummary[];
}) {
  return (
    <section className="rise bg-surface">
      <div className="site-container flex flex-col gap-10 py-section">
        <h2 className="font-heading text-h2 font-medium text-ink">{home.insightsTitle}</h2>
        <ul className="grid items-start gap-8 md:grid-cols-3">
          {insights.map((insight, index) => (
            <li key={insight.slug}>
              <article className="flex flex-col gap-4">
                {insight.featuredImage ? (
                  <SiteLink
                    href={ROUTES.root(insight.slug)}
                    className={`relative block overflow-hidden ${FRAMES[index] ?? FRAMES[1]}`}
                  >
                    <Image
                      src={insight.featuredImage.url}
                      alt={insight.featuredImage.alt}
                      fill
                      sizes={INSIGHT_SIZES}
                      className="object-cover"
                    />
                  </SiteLink>
                ) : null}
                <h3 className="text-h3-insight font-medium text-ink">
                  <SiteLink href={ROUTES.root(insight.slug)}>{insight.title}</SiteLink>
                </h3>
                {insight.excerpt ? (
                  <p className="line-clamp-2 text-text-body">{insight.excerpt}</p>
                ) : null}
                <SiteLink href={ROUTES.root(insight.slug)} className="self-start text-ink">
                  {dictionary.insights.readMore}{' '}
                  <span className="text-accent" aria-hidden="true">
                    {text.arrow}
                  </span>
                </SiteLink>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
