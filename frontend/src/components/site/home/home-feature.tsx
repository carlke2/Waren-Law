import { ROUTES, type WebinarSummary } from '@waren/shared';
import Image from 'next/image';
import { ButtonLink } from '@/components/ui/button-link';
import { dictionary } from '@/lib/utils/dictionary';

const FEATURE_SIZES = '(min-width: 64rem) 40rem, 100vw';

function featureLabel(state: WebinarSummary['state']): string {
  if (state === 'upcoming') return dictionary.webinars.register;
  if (state === 'recording') return dictionary.webinars.watchRecording;
  return dictionary.webinars.requestRecording;
}

export function HomeFeature({ webinar }: { webinar: WebinarSummary | null }) {
  if (!webinar) {
    return (
      <section className="rise bg-surface-warm">
        <div className="site-container py-section">
          <p className="text-lead text-ink">{dictionary.home.featureMissing}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rise bg-surface-warm">
      <div className="site-container grid items-center gap-12 py-section lg:grid-welcome">
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-h2 font-medium text-balance text-ink">
            {webinar.title}
          </h2>
          <p className="text-lead text-text-body">{webinar.summary}</p>
          <ButtonLink href={ROUTES.root(webinar.slug)} variant="soft" className="self-start">
            {featureLabel(webinar.state)}
            <span aria-hidden="true">{dictionary.home.arrow}</span>
          </ButtonLink>
        </div>
        {webinar.heroImage ? (
          <div className="relative">
            <span aria-hidden="true" className="absolute bottom-0 left-0 size-20 bg-accent" />
            <div className="relative z-10 mb-6 ml-6 aspect-feature overflow-hidden">
              <Image
                src={webinar.heroImage.url}
                alt={webinar.heroImage.alt}
                fill
                sizes={FEATURE_SIZES}
                className="object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
