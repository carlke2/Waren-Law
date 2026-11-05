import type { TestimonialResponse } from '@waren/shared';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

export function Testimonials({ items }: { items: readonly TestimonialResponse[] }) {
  if (!items.length) return null;
  return (
    <section className="bg-surface-alt">
      <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>{dictionary.home.testimonialsEyebrow}</Eyebrow>
          <h2 className="font-heading text-h2 font-medium text-brand">
            {dictionary.home.testimonialsTitle}
          </h2>
        </div>
        <div className="grid grid-auto-insight gap-6">
          {items.map((item) => (
            <blockquote
              key={item.id}
              className="flex flex-col gap-4 border border-b-card-rule border-border border-b-brand bg-surface px-7 py-8"
            >
              <p className="font-heading text-h3-card text-brand">{item.quote}</p>
              <footer className="mt-auto text-link text-text-muted">
                {item.attribution}
                {item.location ? ` · ${item.location}` : ''}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
