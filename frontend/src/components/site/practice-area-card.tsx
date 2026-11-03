import type { PracticeAreaSummary } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Link from 'next/link';
import { ArrowIcon } from '@/components/ui/icons';
import { dictionary } from '@/lib/dictionary';

export function PracticeAreaCard({ area }: { area: PracticeAreaSummary }) {
  return (
    <Link
      href={ROUTES.root(area.slug)}
      className="group flex h-full flex-col rounded-md border border-line bg-surface p-6 transition-shadow duration-(--duration-calm) hover:shadow-card"
    >
      <h3 className="text-h4">{area.name}</h3>
      <p className="mt-2 grow text-small text-ink-muted">{area.shortSummary}</p>
      <span className="mt-4 inline-flex items-center gap-2 text-small font-medium text-gold-700">
        {dictionary.common.readMore}
        <ArrowIcon className="size-4 transition-transform duration-(--duration-calm) group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
