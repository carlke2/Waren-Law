import { ROUTES, type InsightDetail } from '@waren/shared';
import Image from 'next/image';
import { SiteCta } from '@/components/home/cta-band';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SiteLink } from '@/components/ui/site-link';
import { getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { articleSchema } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils/dates';
import { BlockRenderer } from '../block-renderer';
import { FaqList } from '../faq-list';
import { InsightsBand } from '../insights-band';
import { JsonLd } from '../json-ld';
import { PageHero } from '../page-hero';

const text = dictionary.insights;
const IMAGE_SIZES = '(min-width: 48rem) 47.5rem, 100vw';
const CHIP =
  'inline-flex min-h-11 items-center border border-border-strong px-4 py-2 text-link font-semibold text-brand hover:border-brand';

export async function InsightTemplate({ insight }: { insight: InsightDetail }) {
  const settings = await getSettings();
  const [category] = insight.categories;
  const meta = [
    insight.publishedAt ? formatDate(insight.publishedAt) : null,
    text.readingTime(insight.readingMinutes),
  ].filter(Boolean);
  return (
    <>
      <JsonLd data={articleSchema(insight, settings, serverEnv().siteUrl)} />
      <PageHero
        title={insight.title}
        eyebrow={category?.name ?? text.title}
        crumbs={[{ label: text.title, href: ROUTES.insights }, { label: insight.title }]}
      >
        <p className="text-link text-on-brand-lead">{meta.join(' · ')}</p>
      </PageHero>
      <article className="bg-surface">
        <div className="site-container flex flex-col items-center py-16 sm:py-28">
          <div className="flex w-full max-w-reading flex-col gap-9">
            {insight.featuredImage ? (
              <Image
                src={insight.featuredImage.url}
                alt={insight.featuredImage.alt}
                width={insight.featuredImage.width ?? undefined}
                height={insight.featuredImage.height ?? undefined}
                sizes={IMAGE_SIZES}
                className="h-auto w-full"
              />
            ) : null}
            <BlockRenderer blocks={insight.body.blocks} />
            {insight.authors.length ? (
              <div className="flex flex-col gap-2 border-t-2 border-brand pt-5">
                <Eyebrow>{text.by}</Eyebrow>
                {insight.authors.map(({ slug, fullName, hasProfile }) =>
                  hasProfile ? (
                    <SiteLink
                      key={slug}
                      href={ROUTES.profile(slug)}
                      className="font-heading text-name font-medium text-brand"
                    >
                      {fullName}
                    </SiteLink>
                  ) : (
                    <span key={slug} className="font-heading text-name font-medium text-brand">
                      {fullName}
                    </span>
                  ),
                )}
              </div>
            ) : null}
            {insight.practiceAreas.length ? (
              <div className="flex flex-col gap-3.5">
                <Eyebrow>{text.relatedPractice}</Eyebrow>
                <div className="flex flex-wrap gap-2.5">
                  {insight.practiceAreas.map(({ slug, name }) => (
                    <SiteLink key={slug} href={ROUTES.root(slug)} className={CHIP}>
                      {name}
                    </SiteLink>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
      <FaqList items={insight.faq} />
      <InsightsBand title={text.related} insights={insight.related} />
      <SiteCta />
    </>
  );
}
