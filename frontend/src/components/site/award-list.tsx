import type { AwardResponse } from '@waren/shared';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

const AWARD_IMAGE_SIZES = '10rem';

export function AwardList({ awards }: { awards: readonly AwardResponse[] }) {
  return (
    <ul className="mt-6 grid gap-5 md:grid-cols-2">
      {awards.map((award) => (
        <li key={award.slug}>
          <Card className="flex h-full items-start gap-5 border-t-2 border-t-gold-500">
            {award.image ? (
              <Image
                src={award.image.url}
                alt={award.image.alt}
                width={award.image.width ?? undefined}
                height={award.image.height ?? undefined}
                sizes={AWARD_IMAGE_SIZES}
                className="h-auto w-24 shrink-0 rounded-sm"
              />
            ) : null}
            <div>
              <p className="text-caption text-ink-muted">
                {award.awarder} · {award.year}
              </p>
              <h3 className="mt-1 text-h4">{award.name}</h3>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
