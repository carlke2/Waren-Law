import type {
  FaqItem,
  InsightDetail,
  OfficeResponse,
  SiteSettings,
  TeamDetail,
  WebinarDetail,
} from '@waren/shared';
import { ROUTES, SEARCH_PARAM } from '@waren/shared';

export interface Crumb {
  label: string;
  href?: string;
}

const CONTEXT = 'https://schema.org';
const LOGO_PATH = '/brand/logo.webp';
const ORGANIZATION_ID = '/#organization';

function postalAddress(office: OfficeResponse) {
  return {
    '@type': 'PostalAddress',
    streetAddress: [office.building, office.addressLine].filter(Boolean).join(', '),
    addressLocality: office.city,
    addressCountry: office.country,
  };
}

export function organizationSchema(
  settings: SiteSettings,
  offices: readonly OfficeResponse[],
  siteUrl: string,
) {
  return {
    '@context': CONTEXT,
    '@type': ['LegalService', 'Organization'],
    '@id': `${siteUrl}${ORGANIZATION_ID}`,
    name: settings.firm.name,
    slogan: settings.firm.tagline,
    url: `${siteUrl}${ROUTES.home}`,
    logo: `${siteUrl}${LOGO_PATH}`,
    image: settings.seo.media.url,
    email: settings.contact.email,
    telephone: settings.contact.phones,
    address: offices.map(postalAddress),
    sameAs: Object.values(settings.socials),
  };
}

export function websiteSchema(settings: SiteSettings, siteUrl: string) {
  return {
    '@context': CONTEXT,
    '@type': 'WebSite',
    name: settings.firm.name,
    url: `${siteUrl}${ROUTES.home}`,
    publisher: { '@id': `${siteUrl}${ORGANIZATION_ID}` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}${ROUTES.search}?${SEARCH_PARAM}={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(crumbs: readonly Crumb[], siteUrl: string) {
  return {
    '@context': CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${siteUrl}${crumb.href}` } : {}),
    })),
  };
}

export function personSchema(member: TeamDetail, siteUrl: string) {
  return {
    '@context': CONTEXT,
    '@type': 'Person',
    name: member.displayName ?? member.fullName,
    jobTitle: member.roleTitle,
    description: member.shortBio,
    url: `${siteUrl}${ROUTES.profile(member.slug)}`,
    worksFor: { '@id': `${siteUrl}${ORGANIZATION_ID}` },
    knowsLanguage: member.languages,
    ...(member.portrait ? { image: member.portrait.url } : {}),
    ...(member.email ? { email: member.email } : {}),
    ...(member.phone ? { telephone: member.phone } : {}),
    ...(member.linkedInUrl ? { sameAs: [member.linkedInUrl] } : {}),
  };
}

export function articleSchema(insight: InsightDetail, settings: SiteSettings, siteUrl: string) {
  const firm = { '@id': `${siteUrl}${ORGANIZATION_ID}` };
  return {
    '@context': CONTEXT,
    '@type': 'Article',
    headline: insight.title,
    description: insight.seo.metaDescription ?? insight.excerpt,
    url: `${siteUrl}${ROUTES.root(insight.slug)}`,
    mainEntityOfPage: `${siteUrl}${ROUTES.root(insight.slug)}`,
    publisher: firm,
    author: insight.authors.length
      ? insight.authors.map((author) => ({
          '@type': 'Person',
          name: author.fullName,
          ...(author.hasProfile ? { url: `${siteUrl}${ROUTES.profile(author.slug)}` } : {}),
        }))
      : { '@type': 'Organization', name: settings.firm.name, url: `${siteUrl}${ROUTES.home}` },
    image: (insight.featuredImage ?? settings.seo.media).url,
    ...(insight.publishedAt ? { datePublished: insight.publishedAt } : {}),
  };
}

export function faqSchema(items: readonly FaqItem[]) {
  return {
    '@context': CONTEXT,
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function eventSchema(webinar: WebinarDetail, siteUrl: string) {
  const url = `${siteUrl}${ROUTES.root(webinar.slug)}`;
  return {
    '@context': CONTEXT,
    '@type': 'Event',
    name: webinar.title,
    description: webinar.summary,
    url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
    location: { '@type': 'VirtualLocation', url: webinar.registrationUrl ?? url },
    organizer: { '@id': `${siteUrl}${ORGANIZATION_ID}` },
    ...(webinar.startsAt ? { startDate: webinar.startsAt } : {}),
    ...(webinar.heroImage ? { image: webinar.heroImage.url } : {}),
  };
}
