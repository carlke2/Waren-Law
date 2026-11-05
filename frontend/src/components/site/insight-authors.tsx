import { ROUTES, type InsightSummary } from '@waren/shared';
import { SiteLink } from '@/components/ui/site-link';
import { dictionary } from '@/lib/dictionary';

export function InsightAuthors({
  authors,
  className,
}: {
  authors: InsightSummary['authors'];
  className?: string;
}) {
  if (!authors.length) return null;
  return (
    <span className={className}>
      {dictionary.insights.by}{' '}
      {authors.map((author, index) => (
        <span key={author.slug}>
          {index > 0 ? ', ' : null}
          {author.hasProfile ? (
            <SiteLink href={ROUTES.profile(author.slug)} className="hover:text-accent">
              {author.fullName}
            </SiteLink>
          ) : (
            author.fullName
          )}
        </span>
      ))}
    </span>
  );
}
