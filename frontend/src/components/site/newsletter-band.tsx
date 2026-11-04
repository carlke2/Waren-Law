import { getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { NewsletterForm } from './newsletter-form';

export async function NewsletterBand() {
  const { newsletter } = await getSettings();
  return (
    <section data-tone="dark" className="bg-brand text-on-brand">
      <div className="site-container flex flex-wrap items-center justify-between gap-12 py-16 sm:py-24">
        <div className="flex min-w-0 flex-welcome-title flex-col gap-3">
          <h2 className="font-heading text-h2 font-medium">{dictionary.newsletter.heading}</h2>
          <p className="text-intro text-on-brand-muted">{newsletter.intro}</p>
        </div>
        <div className="min-w-0 flex-welcome-title">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
