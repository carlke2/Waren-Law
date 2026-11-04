import {
  ROUTES,
  SEARCH_PARAM,
  SEARCH_QUERY_MAX_LENGTH,
  SEARCH_RESULT_TYPES,
  type SearchResponse,
} from '@waren/shared';
import type { Metadata } from 'next';
import { PageHero } from '@/components/site/page-hero';
import { SearchForm } from '@/components/site/search-form';
import { SiteLink } from '@/components/ui/site-link';
import { searchContent } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { NOINDEX_FOLLOW } from '@/lib/seo/metadata';

const text = dictionary.search;

export const metadata: Metadata = { title: text.title, robots: NOINDEX_FOLLOW };

type SearchResult = SearchResponse['results'][number];

function resultHref({ type, slug, hasProfile }: SearchResult): string {
  if (type !== 'team_member') return ROUTES.root(slug);
  return hasProfile ? ROUTES.profile(slug) : ROUTES.team;
}

async function resultsFor(query: string): Promise<SearchResult[] | null> {
  try {
    return (await searchContent(query)).results;
  } catch {
    return null;
  }
}

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// Results depend on what the visitor typed, so this is the one public page rendered on request.
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const raw = (await searchParams)[SEARCH_PARAM];
  const query = typeof raw === 'string' ? raw.trim().slice(0, SEARCH_QUERY_MAX_LENGTH) : '';
  const results = query ? await resultsFor(query) : [];
  return (
    <>
      <PageHero title={text.title} crumbs={[{ label: text.title }]} />
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-9 py-16 sm:py-28">
          <SearchForm query={query} />
          {query && results === null ? (
            <p role="status" className="text-intro text-error">
              {text.unavailable}
            </p>
          ) : null}
          {query && results ? (
            <p role="status" className="text-intro text-text-muted">
              {results.length ? text.count(results.length, query) : text.noResults}
            </p>
          ) : null}
          {SEARCH_RESULT_TYPES.map((type) => {
            const group = results?.filter((result) => result.type === type) ?? [];
            return group.length ? (
              <div key={type} className="flex flex-col gap-3.5">
                <h2 className="font-heading text-h2-compact font-medium text-brand">
                  {text.groups[type]}
                </h2>
                <ul className="border-t border-border">
                  {group.map((result) => (
                    <li key={result.slug} className="border-b border-border py-5">
                      <SiteLink
                        href={resultHref(result)}
                        className="font-heading text-h3-card font-semibold text-brand"
                      >
                        {result.title}
                      </SiteLink>
                      <p className="mt-1 max-w-reading text-card-body text-text-muted">
                        {result.excerpt}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null;
          })}
        </div>
      </section>
    </>
  );
}
