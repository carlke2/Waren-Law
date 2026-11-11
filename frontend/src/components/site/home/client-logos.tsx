import type { ClientLogoResponse } from '@waren/shared';
import Image from 'next/image';

export function ClientLogos({ logos }: { logos: readonly ClientLogoResponse[] }) {
  if (!logos.length) return null;
  return (
    <section className="rise bg-surface">
      <ul className="site-container flex flex-wrap items-center justify-center gap-10 py-section">
        {logos.map((logo) => (
          <li key={logo.slug} className="relative h-16 w-40">
            <Image
              src={logo.logo.url}
              alt={logo.altText}
              fill
              sizes="10rem"
              className="logo-quiet object-contain"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
