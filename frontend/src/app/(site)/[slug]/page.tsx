import { HOME_PAGE_SLUG, ROUTES, type PageResponse } from '@waren/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutTemplate } from '@/components/site/templates/about-template';
import { ContactTemplate } from '@/components/site/templates/contact-template';
import { LegalTemplate } from '@/components/site/templates/legal-template';
import { PartnersTemplate } from '@/components/site/templates/partners-template';
import { InsightTemplate } from '@/components/site/templates/insight-template';
import { PracticeAreaTemplate } from '@/components/site/templates/practice-area-template';
import { WebinarTemplate } from '@/components/site/templates/webinar-template';
import { getRootSlugs } from '@/lib/api/content';
import { dictionary } from '@/lib/dictionary';
import { loadRootContent, type RootContent } from '@/lib/content/root-content';
import { staticParams } from '@/lib/prerender';
import { NOINDEX_FOLLOW, pageMetadata, seoMetadataInput } from '@/lib/seo/metadata';

interface RootPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return staticParams(async () =>
    (await getRootSlugs())
      .filter(({ slug }) => slug !== HOME_PAGE_SLUG)
      .map(({ slug }) => ({ slug })),
  );
}

function rootMetadata(root: RootContent) {
  switch (root.type) {
    case 'page': {
      const { content } = root;
      return seoMetadataInput(content.seo, content.title, ROUTES.root(content.slug));
    }
    case 'practice_area': {
      const { content } = root;
      return {
        ...seoMetadataInput(content.seo, content.name, ROUTES.root(content.slug)),
        description: content.seo.metaDescription ?? content.shortSummary,
        image: content.seo.ogImage ?? content.heroImage,
      };
    }
    case 'insight': {
      const { content } = root;
      return {
        ...seoMetadataInput(content.seo, content.title, ROUTES.root(content.slug)),
        description: content.seo.metaDescription ?? content.excerpt,
        image: content.seo.ogImage ?? content.featuredImage,
        article: {
          publishedTime: content.publishedAt,
          authors: content.authors.map(({ fullName }) => fullName),
        },
      };
    }
    case 'webinar': {
      const { content } = root;
      return {
        ...seoMetadataInput(content.seo, content.title, ROUTES.root(content.slug)),
        description: content.seo.metaDescription ?? content.summary,
        image: content.seo.ogImage ?? content.heroImage,
      };
    }
  }
}

export async function generateMetadata({ params }: RootPageProps): Promise<Metadata> {
  const root = await loadRootContent((await params).slug);
  if (!root) return { title: dictionary.notFound.title, robots: NOINDEX_FOLLOW };
  return pageMetadata(rootMetadata(root));
}

function renderPage(page: PageResponse) {
  switch (page.template) {
    case 'about':
      return <AboutTemplate page={page} />;
    case 'contact':
      return <ContactTemplate page={page} />;
    case 'partners':
      return <PartnersTemplate page={page} />;
    case 'legal':
      return <LegalTemplate page={page} />;
    case 'home':
      notFound();
  }
}

function renderRoot(root: RootContent) {
  switch (root.type) {
    case 'page':
      return renderPage(root.content);
    case 'practice_area':
      return <PracticeAreaTemplate area={root.content} />;
    case 'insight':
      return <InsightTemplate insight={root.content} />;
    case 'webinar':
      return <WebinarTemplate webinar={root.content} />;
  }
}

export default async function RootPage({ params }: RootPageProps) {
  const root = await loadRootContent((await params).slug);
  if (!root) notFound();
  return renderRoot(root);
}
