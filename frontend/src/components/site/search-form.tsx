import { ROUTES, SEARCH_PARAM, SEARCH_QUERY_MAX_LENGTH } from '@waren/shared';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { dictionary } from '@/lib/dictionary';

const text = dictionary.search;

export function SearchForm({ query = '' }: { query?: string }) {
  return (
    <form action={ROUTES.search} role="search" className="w-full max-w-reading">
      <Field>
        <FieldLabel htmlFor="site-search">{text.label}</FieldLabel>
        <Field orientation="horizontal">
          <Input
            id="site-search"
            type="search"
            name={SEARCH_PARAM}
            defaultValue={query}
            maxLength={SEARCH_QUERY_MAX_LENGTH}
          />
          <Button type="submit">{text.submit}</Button>
        </Field>
      </Field>
    </form>
  );
}
