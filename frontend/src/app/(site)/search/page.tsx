import { ROUTES, SEARCH_PARAM, SEARCH_QUERY_MAX_LENGTH, type SearchResponse } from '@waren/shared';
import type { Metadata } from 'next';
import Link from 'next/link';
import { CtaBand } from '@/components/site/cta-band';
import { PageHero } from '@/components/site/page-hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/form';
import { Section } from '@/components/ui/layout';
import { Lead } from '@/components/ui/typography';
import { getSettings, searchContent } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.search;

export const metadata: Metadata = { title: text.title, robots: { index: false, follow: true } };

type SearchResult = SearchResponse['results'][number];

function resultHref({ type, slug, hasProfile }: SearchResult): string {
  if (type !== 'team_member') return ROUTES.root(slug);
  return hasProfile ? ROUTES.profile(slug) : ROUTES.team;
}

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const raw = (await searchParams)[SEARCH_PARAM];
  const query = typeof raw === 'string' ? raw.trim().slice(0, SEARCH_QUERY_MAX_LENGTH) : '';
  const [results, settings] = await Promise.all([
    query ? searchContent(query).then(({ results: found }) => found) : null,
    getSettings(),
  ]);
  return (
    <>
      <PageHero title={text.title} crumbs={[{ label: text.title }]} />
      <Section>
        <form
          action={ROUTES.search}
          role="search"
          className="flex max-w-lead flex-wrap items-end gap-3"
        >
          <div className="grow">
            <Input
              label={text.label}
              type="search"
              name={SEARCH_PARAM}
              defaultValue={query}
              maxLength={SEARCH_QUERY_MAX_LENGTH}
            />
          </div>
          <Button type="submit">{text.submit}</Button>
        </form>
        {results ? (
          <div className="mt-8 max-w-reading">
            <p role="status" className="text-small text-ink-muted">
              {text.count(results.length, query)}
            </p>
            {results.length ? (
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {results.map((result) => (
                  <li key={`${result.type}-${result.slug}`} className="py-4">
                    <p className="text-caption text-gold-700">{text.types[result.type]}</p>
                    <h2 className="mt-1 text-h4">
                      <Link
                        href={resultHref(result)}
                        className="underline-offset-4 hover:underline"
                      >
                        {result.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-small text-ink-muted">{result.excerpt}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <Lead className="mt-4">{text.noResults}</Lead>
            )}
          </div>
        ) : null}
      </Section>
      <CtaBand settings={settings} />
    </>
  );
}
