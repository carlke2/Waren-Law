import type { ClientLogoResponse } from '@waren/shared';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/eyebrow';
import { dictionary } from '@/lib/dictionary';

export function ClientLogos({ logos }: { logos: readonly ClientLogoResponse[] }) {
  if (!logos.length) return null;
  return (
    <section className="border-y border-border bg-surface">
      <div className="site-container flex flex-col items-center gap-8 py-12">
        <Eyebrow>{dictionary.home.clientsEyebrow}</Eyebrow>
        <ul className="flex flex-wrap items-center justify-center gap-10">
          {logos.map((logo) => (
            <li key={logo.slug} className="relative h-16 w-40">
              <Image
                src={logo.logo.url}
                alt={logo.altText}
                fill
                sizes="10rem"
                className="object-contain"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
