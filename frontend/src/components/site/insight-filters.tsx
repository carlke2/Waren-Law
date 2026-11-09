import {
  INSIGHT_CATEGORY_PARAM,
  INSIGHT_KIND_PARAM,
  INSIGHT_KIND_WEBINARS,
  INSIGHT_PRACTICE_PARAM,
  ROUTES,
  type CategoryResponse,
  type PracticeAreaSummary,
} from '@waren/shared';
import { Button } from '@/components/ui/button';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';

const text = dictionary.insights;
const FIELD =
  'min-h-11 min-w-48 flex-1 rounded-lg border border-border bg-surface px-4 text-link text-text';

interface InsightFiltersProps {
  categories: readonly CategoryResponse[];
  practiceAreas: readonly PracticeAreaSummary[];
  practiceArea?: string | undefined;
  category?: string | undefined;
}

export function InsightFilters({
  categories,
  practiceAreas,
  practiceArea,
  category,
}: InsightFiltersProps) {
  return (
    <form
      method="get"
      action={ROUTES.insights}
      aria-label={text.filterLabel}
      className="bg-surface-alt"
    >
      <div className="site-container flex flex-col items-center gap-6 py-10">
        <div className="flex w-full max-w-narrow flex-wrap gap-4">
          <label className="sr-only" htmlFor="insight-practice">
            {text.practiceLabel}
          </label>
          <select
            id="insight-practice"
            name={INSIGHT_PRACTICE_PARAM}
            defaultValue={practiceArea ?? ''}
            className={FIELD}
          >
            <option value="">{text.allPracticeAreas}</option>
            {practiceAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="insight-category">
            {text.categoryLabel}
          </label>
          <select
            id="insight-category"
            name={INSIGHT_CATEGORY_PARAM}
            defaultValue={category ?? ''}
            className={FIELD}
          >
            <option value="">{text.allCategories}</option>
            {categories
              .filter(({ insightCount }) => insightCount > 0)
              .map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
          </select>
          <label className="sr-only" htmlFor="insight-kind">
            {text.contentLabel}
          </label>
          <select id="insight-kind" name={INSIGHT_KIND_PARAM} defaultValue="" className={FIELD}>
            <option value="">{text.kindInsights}</option>
            <option value={INSIGHT_KIND_WEBINARS}>{text.kindWebinars}</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          <SiteLink
            href={ROUTES.insights}
            className="text-link font-semibold text-brand hover:text-accent"
          >
            {text.clearFilters}
          </SiteLink>
          <Button type="submit" variant="accent" size="lg">
            {text.filter}
          </Button>
        </div>
      </div>
    </form>
  );
}
