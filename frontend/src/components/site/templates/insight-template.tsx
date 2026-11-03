import type { InsightDetail } from '@waren/shared';
import { ROUTES } from '@waren/shared';
import Image from 'next/image';
import Link from 'next/link';
import { BlockRenderer } from '@/components/site/block-renderer';
import { CtaBand } from '@/components/site/cta-band';
import { InsightCard } from '@/components/site/insight-card';
import { JsonLd } from '@/components/site/json-ld';
import { PageHero } from '@/components/site/page-hero';
import { Badge } from '@/components/ui/card';
import { Section } from '@/components/ui/layout';
import { Heading } from '@/components/ui/typography';
import { getSettings } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { serverEnv } from '@/lib/env';
import { articleSchema, faqSchema } from '@/lib/seo/schema';
import { formatDate } from '@/lib/utils/dates';

const text = dictionary.insights;
const FEATURED_IMAGE_SIZES = '(min-width: 48rem) 44rem, 100vw';

export async function InsightTemplate({ insight }: { insight: InsightDetail }) {
  const settings = await getSettings();
  const { siteUrl } = serverEnv();
  return (
    <>
      <JsonLd data={articleSchema(insight, settings, siteUrl)} />
      {insight.faq.length ? <JsonLd data={faqSchema(insight.faq)} /> : null}
      <PageHero
        title={insight.title}
        crumbs={[{ label: text.title, href: ROUTES.insights }, { label: insight.title }]}
      >
        <p className="mt-4 text-small">
          {text.by}{' '}
          {insight.authors.length
            ? insight.authors.map((author, index) => (
                <span key={author.slug}>
                  {index > 0 ? ', ' : null}
                  {author.hasProfile ? (
                    <Link
                      href={ROUTES.profile(author.slug)}
                      className="underline underline-offset-4"
                    >
                      {author.fullName}
                    </Link>
                  ) : (
                    author.fullName
                  )}
                </span>
              ))
            : settings.firm.name}
          {insight.publishedAt ? ` · ${formatDate(insight.publishedAt)}` : null}
          {` · ${text.readingTime(insight.readingMinutes)}`}
        </p>
        {insight.categories.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {insight.categories.map((category) => (
              <li key={category.slug}>
                <Link href={ROUTES.category(category.slug)}>
                  <Badge>{category.name}</Badge>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </PageHero>
      <Section tone="white">
        <article>
          {insight.featuredImage ? (
            <Image
              src={insight.featuredImage.url}
              alt={insight.featuredImage.alt}
              width={insight.featuredImage.width ?? undefined}
              height={insight.featuredImage.height ?? undefined}
              sizes={FEATURED_IMAGE_SIZES}
              priority
              className="mb-8 h-auto w-full max-w-reading rounded-md"
            />
          ) : null}
          <BlockRenderer blocks={insight.body.blocks} />
          {insight.practiceAreas.length ? (
            <div className="mt-10 max-w-reading border-t border-line pt-6">
              <h2 className="text-h4">{text.relatedPractice}</h2>
              <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                {insight.practiceAreas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={ROUTES.root(area.slug)}
                      className="text-gold-700 underline underline-offset-4 hover:text-navy-900"
                    >
                      {area.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </Section>
      {insight.related.length ? (
        <Section>
          <Heading level={2}>{text.related}</Heading>
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {insight.related.map((related) => (
              <li key={related.slug}>
                <InsightCard insight={related} />
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <CtaBand settings={settings} />
    </>
  );
}
