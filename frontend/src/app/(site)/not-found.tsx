import { ROUTES } from '@waren/shared';
import { PageHero } from '@/components/site/page-hero';
import { SearchForm } from '@/components/site/search-form';
import { TextLink } from '@/components/ui/text-link';
import { dictionary } from '@/lib/dictionary';
import { PRIMARY_NAV } from '@/lib/navigation';

const text = dictionary.notFound;

export default function NotFound() {
  return (
    <>
      <PageHero title={text.title} intro={text.lead} crumbs={[{ label: text.crumb }]} />
      <section className="bg-surface">
        <div className="site-container flex flex-col gap-9 py-16 sm:py-28">
          <SearchForm />
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {PRIMARY_NAV.filter(({ href }) => href !== ROUTES.home).map(({ label, href }) => (
              <TextLink key={href} href={href}>
                {label}
              </TextLink>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
