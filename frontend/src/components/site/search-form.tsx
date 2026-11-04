import { ROUTES, SEARCH_PARAM, SEARCH_QUERY_MAX_LENGTH } from '@waren/shared';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.search;

export function SearchForm({ query = '' }: { query?: string }) {
  return (
    <form action={ROUTES.search} role="search" className="flex w-full max-w-reading flex-col gap-2">
      <label htmlFor="site-search" className="text-link font-semibold text-brand">
        {text.label}
      </label>
      <div className="flex">
        <input
          id="site-search"
          type="search"
          name={SEARCH_PARAM}
          defaultValue={query}
          maxLength={SEARCH_QUERY_MAX_LENGTH}
          className="min-h-12 min-w-0 flex-auto border border-border-strong bg-surface px-3.5 text-text"
        />
        <button
          type="submit"
          className="min-h-12 shrink-0 bg-brand px-6.5 text-button font-semibold text-on-brand"
        >
          {text.submit}
        </button>
      </div>
    </form>
  );
}
