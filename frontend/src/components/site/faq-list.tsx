import type { FaqItem } from '@waren/shared';
import { dictionary } from '@/lib/dictionary';
import { faqSchema } from '@/lib/seo/schema';
import { JsonLd } from './json-ld';

interface FaqListProps {
  items: readonly FaqItem[];
  title?: string;
}

export function FaqList({ items, title = dictionary.practice.faq }: FaqListProps) {
  if (!items.length) return null;
  return (
    <section className="bg-surface-alt">
      <JsonLd data={faqSchema(items)} />
      <div className="site-container flex flex-col gap-9 py-16 sm:py-28">
        <h2 className="font-heading text-h2 font-medium text-brand">{title}</h2>
        <div className="border-t border-border">
          {items.map(({ question, answer }) => (
            <details key={question} className="group border-b border-border">
              <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-6 py-5 font-heading text-h3-card font-semibold text-brand">
                {question}
                <span aria-hidden="true" className="text-arrow group-open:rotate-45">
                  {dictionary.common.expandIcon}
                </span>
              </summary>
              <p className="max-w-reading pb-6 text-body text-text-body">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
