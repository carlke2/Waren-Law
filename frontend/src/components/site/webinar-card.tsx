import { ROUTES, type WebinarSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { webinarStateLabel } from '@/lib/content/webinars';
import { formatDate } from '@/lib/utils/dates';

const IMAGE_SIZES = '(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw';

export function WebinarCard({ webinar }: { webinar: WebinarSummary }) {
  return (
    <SiteLink href={ROUTES.root(webinar.slug)} className="flex flex-col gap-4.5 text-text">
      <div className="relative aspect-insight bg-surface-alt">
        {webinar.heroImage ? (
          <Image
            src={webinar.heroImage.url}
            alt={webinar.heroImage.alt}
            fill
            sizes={IMAGE_SIZES}
            className="object-cover"
          />
        ) : null}
      </div>
      <span className="text-category font-bold tracking-category text-accent-text uppercase">
        {webinarStateLabel(webinar.state)}
      </span>
      <h3 className="font-heading text-h3-insight font-semibold text-brand">{webinar.title}</h3>
      {webinar.startsAt ? (
        <span className="text-date text-text-subtle">
          {formatDate(webinar.startsAt, webinar.timezone)}
        </span>
      ) : null}
    </SiteLink>
  );
}
