import type { WebinarSummary } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Link from 'next/link';
import { Badge } from '@/components/ui/card';
import { webinarStateLabel } from '@/lib/content/webinars';
import { formatDate } from '@/lib/utils/dates';

export function WebinarCard({ webinar }: { webinar: WebinarSummary }) {
  return (
    <article className="flex h-full flex-col rounded-md border border-line bg-surface p-6">
      <div>
        <Badge>{webinarStateLabel(webinar.state)}</Badge>
      </div>
      <h2 className="mt-3 text-h3">
        <Link href={ROUTES.root(webinar.slug)} className="underline-offset-4 hover:underline">
          {webinar.title}
        </Link>
      </h2>
      {webinar.startsAt ? (
        <p className="mt-1 text-caption text-ink-muted">
          {formatDate(webinar.startsAt, webinar.timezone)}
        </p>
      ) : null}
      <p className="mt-3 text-small text-ink-muted">{webinar.summary}</p>
    </article>
  );
}
