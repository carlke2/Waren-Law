import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SiteLink } from '@/components/ui/site-link';
import { getHome } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { breadcrumbSchema } from '@/lib/seo/schema';
import { JsonLd } from './json-ld';

const IMAGE_SIZES = '100vw';

export interface Crumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  crumbs: readonly Crumb[];
  eyebrow?: string | undefined;
  intro?: string | null | undefined;
}

export async function PageHero({ title, crumbs, eyebrow, intro }: PageHeroProps) {
  const home = await getHome();
  const trail: readonly Crumb[] = [{ label: dictionary.common.home, href: ROUTES.home }, ...crumbs];
  return (
    <section data-tone="dark" className="relative -mt-header bg-brand-strong pt-header">
      <JsonLd data={breadcrumbSchema(trail, serverEnv().siteUrl)} />
      {home ? (
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={home.heroImage.url}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes={IMAGE_SIZES}
            className="object-cover object-bottom"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="hero-overlay-top absolute inset-x-0 top-0" />
        </div>
      ) : null}
      <div className="relative z-10 site-container flex flex-col gap-4 pt-12 pb-16 sm:pt-18 sm:pb-24">
        <nav aria-label={dictionary.common.breadcrumb} className="text-link text-on-brand-muted">
          <ol className="flex flex-wrap items-center gap-x-1.5">
            {trail.map(({ label, href }) => (
              <li key={label} className="flex items-center gap-x-1.5">
                {href ? (
                  <>
                    <SiteLink href={href} className="hover:text-on-brand">
                      {label}
                    </SiteLink>
                    <span aria-hidden="true">/</span>
                  </>
                ) : (
                  <span aria-current="page" className="text-on-brand">
                    {label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow ? (
          <div className="flex items-center gap-3.5">
            <span className="h-rule w-rule-short bg-accent" />
            <Eyebrow onBrand>{eyebrow}</Eyebrow>
          </div>
        ) : null}
        <h1 className="max-w-h1 font-heading text-h1-page font-medium text-on-brand">{title}</h1>
        {intro ? <p className="max-w-intro text-lead text-on-brand-lead">{intro}</p> : null}
      </div>
    </section>
  );
}
