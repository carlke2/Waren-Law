import { ROUTES, type HomeResponse, type InsightSummary } from '@waren/shared';
import { InsightCard } from '@/components/site/insight-card';
import { dictionary } from '@/lib/utils/dictionary';
import { HomeSection } from './home-section';
import { ArrowLink, CARD_HOVER_LINE } from './home-links';
import { SectionHeading } from './section-heading';

const text = dictionary.home;

interface LatestInsightsProps {
  home: HomeResponse;
  insights: readonly InsightSummary[];
}

export function LatestInsights({ home, insights }: LatestInsightsProps) {
  return (
    <HomeSection tone="tint">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={text.insightsEyebrow} title={home.insightsTitle} />
        <ArrowLink href={ROUTES.insights}>{text.allInsights}</ArrowLink>
      </div>
      <div className={`grid grid-auto-insight gap-7 ${CARD_HOVER_LINE}`}>
        {insights.map((insight) => (
          <InsightCard key={insight.slug} insight={insight} />
        ))}
      </div>
    </HomeSection>
  );
}
