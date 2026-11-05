import { ROUTES, type WebinarDetail } from '@waren/shared';
import { SiteCta } from '@/components/home/cta-band';
import { ButtonLink } from '@/components/ui/button-link';
import { SectionHeading } from '@/components/ui/section-heading';
import { webinarStateLabel } from '@/lib/content/webinars';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { eventSchema } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils/dates';
import { BlockRenderer } from '../block-renderer';
import { FaqList } from '../faq-list';
import { JsonLd } from '../json-ld';
import { LeadForm } from '../lead-form';
import { PageHero } from '../page-hero';
import { TeamGrid } from '../team-photo';

const text = dictionary.webinars;

function HeroAction({ webinar }: { webinar: WebinarDetail }) {
  if (webinar.recordingUrl && !webinar.recordingGated) {
    return (
      <div className="mt-2">
        <ButtonLink href={webinar.recordingUrl} variant="gold" external>
          {text.watchRecording}
        </ButtonLink>
      </div>
    );
  }
  if (webinar.state === 'upcoming' && webinar.registrationUrl) {
    return (
      <div className="mt-2">
        <ButtonLink href={webinar.registrationUrl} variant="gold" external>
          {text.register}
        </ButtonLink>
      </div>
    );
  }
  return null;
}

export function WebinarTemplate({ webinar }: { webinar: WebinarDetail }) {
  const showRequestForm = webinar.state === 'recording' && !webinar.recordingUrl;
  const date = webinar.startsAt ? formatDate(webinar.startsAt, webinar.timezone) : null;
  return (
    <>
      {webinar.startsAt ? <JsonLd data={eventSchema(webinar, serverEnv().siteUrl)} /> : null}
      <PageHero
        title={webinar.title}
        eyebrow={webinarStateLabel(webinar.state)}
        intro={date}
        crumbs={[
          { label: dictionary.insights.title, href: ROUTES.insights },
          { label: text.title, href: ROUTES.webinars },
          { label: webinar.title },
        ]}
      >
        <HeroAction webinar={webinar} />
      </PageHero>
      <section className="bg-surface">
        <div className="site-container flex flex-col items-center py-16 sm:py-28">
          <div className="flex w-full max-w-reading flex-col gap-9">
            <p className="text-lead text-text-body">{webinar.summary}</p>
            <BlockRenderer blocks={webinar.body.blocks} />
          </div>
        </div>
      </section>
      {webinar.panel.length ? (
        <section data-tone="dark" className="bg-brand text-on-brand">
          <div className="site-container flex flex-col gap-12 py-16 sm:py-28">
            <SectionHeading eyebrow={text.title} title={text.panel} onBrand />
            <TeamGrid members={webinar.panel} />
          </div>
        </section>
      ) : null}
      <FaqList items={webinar.faq} title={text.faq} />
      {showRequestForm ? (
        <section className="bg-surface">
          <div className="site-container flex flex-col gap-7 py-16 sm:py-28">
            <h2 className="font-heading text-h2 font-medium text-brand">{text.requestRecording}</h2>
            <LeadForm form="recording" submitLabel={text.requestRecording} />
          </div>
        </section>
      ) : null}
      <SiteCta />
    </>
  );
}
