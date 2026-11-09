import { ROUTES, type WebinarSummary } from '@waren/shared';
import Image from 'next/image';
import { SiteLink } from '@/components/ui/site-link';
import { webinarStateLabel } from '@/lib/utils/content/webinars';
import { formatDate } from '@/lib/utils/dates';

const IMAGE_SIZES = '(min-width: 64rem) 25rem, (min-width: 40rem) 50vw, 100vw';

export function WebinarCard({ webinar }: { webinar: WebinarSummary }) {
  return (
    <SiteLink href={ROUTES.root(webinar.slug)} className="surface-card flex flex-col gap-4 overflow-hidden">
      {webinar.heroImage?.width && webinar.heroImage.height ? (
        <Image
          src={webinar.heroImage.url}
          alt={webinar.heroImage.alt}
          width={webinar.heroImage.width}
          height={webinar.heroImage.height}
          sizes={IMAGE_SIZES}
          className="h-auto w-full"
        />
      ) : (
        <div className="relative aspect-insight bg-surface-alt">
          {webinar.heroImage ? (
            <Image
              src={webinar.heroImage.url}
              alt={webinar.heroImage.alt}
              fill
              sizes={IMAGE_SIZES}
              className="object-contain"
            />
          ) : null}
        </div>
      )}
      <span className="flex flex-1 flex-col gap-3 px-5 pb-5">
        <span className="text-category font-bold tracking-category text-accent-text uppercase">
          {webinarStateLabel(webinar.state)}
        </span>
        <h3 className="font-heading text-h3-insight font-semibold">{webinar.title}</h3>
        {webinar.startsAt ? (
          <span className="mt-auto text-date text-text-subtle">
            {formatDate(webinar.startsAt, webinar.timezone)}
          </span>
        ) : null}
      </span>
    </SiteLink>
  );
}
