import { HOME_FAQ_LIMIT, ROUTES, type FaqEntry } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';
import { faqSchema } from '@/lib/seo/schema';
import { JsonLd } from './json-ld';

const text = dictionary.faqPage;

export function SourcedFaq({
  items,
  title,
  preview = false,
  showHeading = true,
}: {
  items: readonly FaqEntry[];
  title: string;
  preview?: boolean;
  showHeading?: boolean;
}) {
  const shown = preview ? items.slice(0, HOME_FAQ_LIMIT) : items;
  if (!shown.length) return null;
  return (
    <section className="bg-surface">
      <JsonLd data={faqSchema(shown)} />
      <div className="site-container flex flex-col gap-9 py-16 sm:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          {showHeading ? (
            <h2 className="font-heading text-h2 font-medium text-brand">{title}</h2>
          ) : (
            <h2 className="sr-only">{title}</h2>
          )}
          {preview && items.length > shown.length ? (
            <SiteLink
              href={ROUTES.faq}
              className="inline-flex items-center border-b-2 border-accent pb-1 text-button font-bold text-brand"
            >
              {dictionary.home.allQuestions}
            </SiteLink>
          ) : null}
        </div>
        <div className="border-t border-border">
          {shown.map((item) => (
            <details key={`${item.href}-${item.question}`} className="group border-b border-border">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-5 font-heading text-h3-card font-semibold text-brand">
                {item.question}
                <span aria-hidden="true" className="text-arrow group-open:rotate-45">
                  {dictionary.common.expandIcon}
                </span>
              </summary>
              <p className="max-w-reading pb-3 text-body text-text-body">{item.answer}</p>
              <p className="pb-6">
                <SiteLink
                  href={item.href}
                  className="text-link font-bold text-brand hover:text-accent-text"
                >
                  {text.onSource(item.sourceTitle)}
                </SiteLink>
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
