import type { AwardResponse } from '@waren/shared';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/utils/dictionary';

const CERTIFICATE_SIZES = '10rem';

export function RecognitionBlock({ award }: { award: AwardResponse }) {
  return (
    <section className="border-t border-border bg-surface-alt">
      <div className="site-container flex flex-wrap items-center gap-10 py-16 sm:py-18">
        {award.image ? (
          <div className="relative aspect-certificate w-40 shrink-0 bg-surface">
            <Image
              src={award.image.url}
              alt={award.image.alt}
              fill
              sizes={CERTIFICATE_SIZES}
              className="object-cover"
            />
          </div>
        ) : null}
        <div className="flex min-w-0 flex-recognition flex-col gap-2">
          <Eyebrow>{dictionary.about.recognitionLabel(award.awarder, award.year)}</Eyebrow>
          <h2 className="font-heading text-h2-compact font-medium text-brand">{award.name}</h2>
        </div>
      </div>
    </section>
  );
}
