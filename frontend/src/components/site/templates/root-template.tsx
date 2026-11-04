import { ROUTES, type PageResponse } from '@waren/shared';
import { notFound } from 'next/navigation';
import type { RootContent } from '@/lib/content/root-content';
import { seoMetadataInput } from '@/lib/seo/metadata';
import { HoldingPage } from '../holding-page';
import { AboutTemplate } from './about-template';
import { PartnersTemplate } from './partners-template';
import { PracticeAreaTemplate } from './practice-area-template';

export function rootMetadata(root: RootContent) {
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

function PageTemplate({ page }: { page: PageResponse }) {
  switch (page.template) {
    case 'about':
      return <AboutTemplate page={page} />;
    case 'partners':
      return <PartnersTemplate page={page} />;
    case 'home':
      return notFound();
    default:
      return <HoldingPage title={page.title} />;
  }
}

export function RootTemplate({ root }: { root: RootContent }) {
  switch (root.type) {
    case 'page':
      return <PageTemplate page={root.content} />;
    case 'practice_area':
      return <PracticeAreaTemplate area={root.content} />;
    case 'insight':
    case 'webinar':
      return <HoldingPage title={root.content.title} />;
  }
}
