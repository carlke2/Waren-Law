import { ROUTES, type WebinarDetail, type WebinarSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/utils/dictionary';
import { formatFeatureEvent, isYoutubeUrl } from '@/lib/utils/dates';

type FeatureWebinar = WebinarSummary & {
  recordingUrl?: string | null;
};

function featureLabel(state: WebinarSummary['state']): string {
  if (state === 'upcoming') return dictionary.webinars.register;
  if (state === 'recording') return dictionary.webinars.watchRecording;
  return dictionary.webinars.requestRecording;
}

function splitCardTitle(title: string): { lead: string | null; rest: string } {
  const index = title.indexOf(':');
  if (index === -1) return { lead: null, rest: title };
  return { lead: title.slice(0, index + 1), rest: title.slice(index + 1).trim() };
}

function EventPill({ startsAt, timezone }: { startsAt: string; timezone: string | null }) {
  const event = formatFeatureEvent(startsAt, timezone);
  return (
    <p className="feature-pill">
      <span>
        {event.month} {event.day}
        <sup>{event.ordinal}</sup>
        {event.time ? ` AT ${event.time}` : ''}
        {event.zone ? ` ${event.zone}` : ''}
      </span>
    </p>
  );
}

function FlagPole({
  src,
  alt,
  side,
}: {
  src: string;
  alt: string;
  side: 'left' | 'right';
}) {
  return (
    <div className={`feature-flag feature-flag-${side}`}>
      <span className="feature-flag-finial" aria-hidden="true" />
      <span className="feature-flag-pole" aria-hidden="true" />
      <Image
        src={src}
        alt={alt}
        width={side === 'left' ? 180 : 190}
        height={side === 'left' ? 120 : 100}
        className="feature-flag-cloth"
      />
    </div>
  );
}

export function HomeFeature({ webinar }: { webinar: FeatureWebinar | WebinarDetail | null }) {
  const text = dictionary.home;

  if (!webinar) {
    return (
      <section className="feature-canvas rise">
        <div className="feature-shell site-container">
          <p className="feature-lead">{text.featureMissing}</p>
        </div>
      </section>
    );
  }

  const youtubeUrl = isYoutubeUrl(webinar.recordingUrl) ? webinar.recordingUrl : null;
  const cardTitle = splitCardTitle(webinar.title);

  return (
    <section className="feature-canvas rise" aria-labelledby="home-feature-heading">
      <div className="feature-shell site-container">
        <div className="feature-copy">
          <p className="feature-eyebrow">
            <span aria-hidden="true" className="feature-eyebrow-rule" />
            {text.featureEyebrow}
          </p>
          <h2 id="home-feature-heading" className="feature-headline">
            <span className="feature-headline-line">{text.featureHeadlineLead}</span>
            <span className="feature-headline-line">
              {text.featureHeadlineJoin}{' '}
              <span className="feature-emphasis">{text.featureHeadlineEmphasis}</span>
            </span>
          </h2>
          <p className="feature-lead">{webinar.summary}</p>
          <div className="feature-actions">
            <SiteLink href={ROUTES.root(webinar.slug)} className="feature-btn">
              {featureLabel(webinar.state)}
              <span aria-hidden="true" className="feature-btn-arrow">
                {text.arrow}
              </span>
            </SiteLink>
            {youtubeUrl ? (
              <a href={youtubeUrl} className="feature-youtube" target="_blank" rel="noopener noreferrer">
                <span className="feature-youtube-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="feature-youtube-svg">
                    <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M10 8.5v7l6-3.5z" fill="currentColor" />
                  </svg>
                </span>
                {text.featureWatchYoutube}
              </a>
            ) : null}
          </div>
        </div>

        <div className="feature-stage">
          <FlagPole src="/home/flags/kenya.svg" alt={text.featureKenyaFlagAlt} side="left" />
          <article className="feature-card">
            <p className="feature-card-eyebrow">
              <span aria-hidden="true" className="feature-card-rule" />
              {text.featureCardEyebrow}
              <span aria-hidden="true" className="feature-card-rule" />
            </p>
            <h3 className="feature-card-title">
              {cardTitle.lead ? <span className="feature-card-lead">{cardTitle.lead}</span> : null}
              {cardTitle.rest ? <span className="feature-card-rest">{cardTitle.rest}</span> : null}
            </h3>
            {webinar.startsAt ? (
              <EventPill startsAt={webinar.startsAt} timezone={webinar.timezone} />
            ) : null}
          </article>
          <FlagPole src="/home/flags/usa.svg" alt={text.featureUsaFlagAlt} side="right" />
        </div>
      </div>
    </section>
  );
}
