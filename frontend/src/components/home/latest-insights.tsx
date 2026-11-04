import { ROUTES, type HomeResponse, type InsightSummary } from '@waren/shared';
import { InsightCard } from '@/components/site/insight-card';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';
import { Eyebrow } from '@/components/ui/eyebrow';

const text = dictionary.home;
interface LatestInsightsProps {
  home: HomeResponse;
  insights: readonly InsightSummary[];
}

export function LatestInsights({ home, insights }: LatestInsightsProps) {
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>{text.insightsEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{home.insightsTitle}</h2>
          </div>
          <SiteLink
            href={ROUTES.insights}
            className="inline-flex items-center border-b-2 border-accent pb-1 text-button font-bold text-brand max-sm:min-h-11"
          >
            {text.allInsights} {text.arrow}
          </SiteLink>
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
