import type {
  InsightDetail,
  InsightSummary,
  SiteSettings,
  TeamDetail,
  WebinarDetail,
} from '@waren/shared';
import { lastPageRedirect, patternRedirect, withTrailingSlash } from '@/lib/utils/redirects/patterns';
import { buildRssFeed } from '@/lib/utils/seo/feed';
import { NOINDEX_FOLLOW, NOT_INDEXED, pageRobots, resolveTitle } from '@/lib/utils/seo/metadata';
import {
  articleSchema,
  breadcrumbSchema,
  eventSchema,
  faqSchema,
  organizationSchema,
  personSchema,
  websiteSchema,
} from '@/lib/utils/seo/schema';
import { sitemapEntries } from '@/lib/utils/seo/sitemap';

const SITE = 'https://example.test';
const media = { url: 'https://example.test/uploads/a.webp', alt: 'A', width: 10, height: 10 };
const settings = {
  firm: { name: 'Firm LLP', tagline: 'Tag' },
  contact: { phones: ['+254700000000'], email: 'info@example.test', addressLine: '1 Test Road' },
  newsletter: { intro: 'Newsletter intro' },
  socials: {
    linkedIn: 'https://l.test',
    facebook: 'https://f.test',
    instagram: 'https://i.test',
    youtube: 'https://y.test',
  },
  seo: { titleTemplate: '%s | Firm', description: 'D', media },
} as unknown as SiteSettings;
const office = {
  slug: 'n',
  name: 'Nairobi',
  type: 'head',
  addressLine: 'Road',
  building: 'House',
  city: 'Nairobi',
  country: 'Kenya',
  poBox: null,
  phone: null,
  email: null,
  latitude: null,
  longitude: null,
  mapEmbedUrl: null,
} as const;

describe('patternRedirect', () => {
  const none = new URLSearchParams();
  it.each([
    ['/author/', '/our-team/'],
    ['/author/someone/page/2/', '/our-team/'],
    ['/zh/author/someone/', '/our-team/'],
    ['/tag/kenya/', '/insights/'],
    ['/zh/', '/'],
    ['/zh/about-us/', '/about-us/'],
  ])('sends %s to %s', (path, target) => {
    expect(patternRedirect(path, none)).toBe(target);
  });

  it('sends MailPoet URLs to Insights', () => {
    expect(patternRedirect('/', new URLSearchParams('mailpoet_page=captcha'))).toBe('/insights/');
  });

  it('leaves similar real paths alone', () => {
    for (const path of ['/authority/', '/tagged/', '/zhejiang-office/', '/insights/']) {
      expect(patternRedirect(path, none)).toBeNull();
    }
  });
});

describe('lastPageRedirect', () => {
  it('sends only out-of-range pages to the last page', () => {
    expect(lastPageRedirect('/insights/page/4/', 3)).toBe('/insights/page/3/');
    expect(lastPageRedirect('/insights/page/3/', 3)).toBeNull();
    expect(lastPageRedirect('/insights/', 3)).toBeNull();
    expect(lastPageRedirect('/insights/page/2/', 1)).toBe('/insights/');
  });
});

describe('withTrailingSlash', () => {
  it('adds a slash only when missing', () => {
    expect(withTrailingSlash('/a')).toBe('/a/');
    expect(withTrailingSlash('/a/')).toBe('/a/');
    expect(withTrailingSlash('/')).toBe('/');
  });
});

describe('robots', () => {
  it('blocks every page while the site is not indexable', () => {
    expect(pageRobots(false)).toEqual(NOT_INDEXED);
    expect(pageRobots(false, true)).toEqual(NOT_INDEXED);
  });

  it('follows the record once the site is indexable', () => {
    expect(pageRobots(true)).toBeUndefined();
    expect(pageRobots(true, true)).toEqual(NOINDEX_FOLLOW);
  });
});

describe('resolveTitle', () => {
  it('skips the template when the title already names the firm', () => {
    expect(resolveTitle('Contact Waren Law Advocates')).toEqual({
      absolute: 'Contact Waren Law Advocates',
    });
    expect(resolveTitle('Our Team')).toBe('Our Team');
  });
});

describe('JSON-LD', () => {
  it('describes the firm as a legal service with its offices', () => {
    const schema = organizationSchema(settings, [office], SITE);
    expect(schema['@type']).toEqual(['LegalService', 'Organization']);
    expect(schema.address[0]).toMatchObject({
      addressLocality: 'Nairobi',
      addressCountry: 'Kenya',
    });
    expect(schema.sameAs).toContain('https://l.test');
    expect(schema.logo.startsWith(SITE)).toBe(true);
  });

  it('gives the website a search action', () => {
    const schema = websiteSchema(settings, SITE);
    expect(schema.potentialAction.target.urlTemplate).toBe(
      `${SITE}/search/?q={search_term_string}`,
    );
  });

  it('numbers breadcrumbs and leaves the current page unlinked', () => {
    const schema = breadcrumbSchema([{ label: 'Home', href: '/' }, { label: 'Here' }], SITE);
    expect(schema.itemListElement[0]).toMatchObject({ position: 1, item: `${SITE}/` });
    expect(schema.itemListElement[1]).not.toHaveProperty('item');
  });

  it('links a person to the firm', () => {
    const schema = personSchema(
      {
        slug: 'a',
        fullName: 'A B',
        displayName: null,
        roleTitle: 'R',
        shortBio: 'S',
        languages: [],
        portrait: media,
        email: null,
        phone: null,
        linkedInUrl: null,
      } as unknown as TeamDetail,
      SITE,
    );
    expect(schema.url).toBe(`${SITE}/our-team/a/`);
    expect(schema.worksFor['@id']).toBe(`${SITE}/#organization`);
    expect(schema).not.toHaveProperty('email');
  });

  it('credits the firm when an article has no named author', () => {
    const insight = {
      slug: 'a',
      title: 'T',
      excerpt: 'E',
      authors: [],
      featuredImage: null,
      publishedAt: '2026-01-01T00:00:00.000Z',
      seo: { metaDescription: null },
    } as unknown as InsightDetail;
    expect(articleSchema(insight, settings, SITE).author).toMatchObject({ name: 'Firm LLP' });
    expect(articleSchema(insight, settings, SITE).image).toBe(media.url);
  });

  it('builds an FAQ page', () => {
    expect(faqSchema([{ question: 'Q', answer: 'A' }]).mainEntity[0]).toMatchObject({
      name: 'Q',
      acceptedAnswer: { text: 'A' },
    });
  });

  it('builds an online event', () => {
    const webinar = {
      slug: 'w',
      title: 'W',
      summary: 'S',
      startsAt: '2027-01-01T00:00:00.000Z',
      registrationUrl: 'https://reg.test',
      heroImage: null,
    } as unknown as WebinarDetail;
    expect(eventSchema(webinar, SITE)).toMatchObject({
      startDate: webinar.startsAt,
      location: { url: 'https://reg.test' },
    });
  });
});

describe('sitemapEntries', () => {
  it('lists only indexable records', () => {
    const entries = sitemapEntries({
      siteUrl: SITE,
      rootSlugs: [
        { type: 'page', slug: 'home', noindex: false, updatedAt: 'x' },
        { type: 'insight', slug: 'kept', noindex: false, updatedAt: 'x' },
        { type: 'insight', slug: 'hidden', noindex: true, updatedAt: 'x' },
      ],
      team: {
        total: 2,
        groups: [
          {
            memberType: 'staff',
            members: [
              { slug: 'pro', hasProfile: true },
              { slug: 'staff', hasProfile: false },
            ] as never,
          },
        ],
      },
      categories: [
        { slug: 'full', name: 'F', description: null, insightCount: 1 },
        { slug: 'empty', name: 'E', description: null, insightCount: 0 },
      ],
    }).map(({ url }) => url);
    expect(entries).toContain(`${SITE}/kept/`);
    expect(entries).toContain(`${SITE}/our-team/pro/`);
    expect(entries).toContain(`${SITE}/category/full/`);
    for (const absent of ['/hidden/', '/home/', '/our-team/staff/', '/category/empty/']) {
      expect(entries).not.toContain(`${SITE}${absent}`);
    }
    expect(entries.filter((url) => url === `${SITE}/`)).toHaveLength(1);
  });
});

describe('buildRssFeed', () => {
  it('escapes text and lists items', () => {
    const insight = {
      slug: 'a',
      title: 'Tax & <Trusts>',
      excerpt: 'E',
      publishedAt: '2026-01-02T00:00:00.000Z',
      categories: [{ slug: 'c', name: 'Cat' }],
    } as unknown as InsightSummary;
    const feed = buildRssFeed({ title: 'T', description: 'D', siteUrl: SITE }, [insight]);
    expect(feed).toContain('Tax &amp; &lt;Trusts&gt;');
    expect(feed).toContain(`<link>${SITE}/a/</link>`);
    expect(feed).toContain('<pubDate>Fri, 02 Jan 2026');
    expect(feed).not.toContain('<Trusts>');
  });
});
