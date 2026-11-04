import { ROUTES, type InsightSummary } from '@waren/shared';
import { Eyebrow } from '@/components/ui/eyebrow';
import { TextLink } from '@/components/ui/text-link';
import { dictionary } from '@/lib/dictionary';
import { InsightCard } from './insight-card';

interface InsightsBandProps {
  title: string;
  insights: readonly InsightSummary[];
}

export function InsightsBand({ title, insights }: InsightsBandProps) {
  if (!insights.length) return null;
  return (
    <section className="bg-surface">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <Eyebrow>{dictionary.home.insightsEyebrow}</Eyebrow>
            <h2 className="font-heading text-h2 font-medium text-brand">{title}</h2>
          </div>
          <TextLink href={ROUTES.insights}>
            {dictionary.home.allInsights} {dictionary.home.arrow}
          </TextLink>
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
