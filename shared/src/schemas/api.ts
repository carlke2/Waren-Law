import { z } from 'zod';
import {
  DEFAULT_PAGE_SIZE,
  FAQ_SOURCE_TYPES,
  HERO_CARD_COUNT,
  ICON_NAMES,
  LEGAL_REVIEW_STATUSES,
  PAGE_TEMPLATES,
  MAX_PAGE_SIZE,
  MEMBER_TYPES,
  OFFICE_TYPES,
  SETTING_KEYS,
  SLUG_TYPES,
  WEBINAR_STATES,
} from '../constants/content.js';
import {
  CONTACT_FIELD_MAX_LENGTH,
  CONTACT_MESSAGE_MAX_LENGTH,
  CONTACT_SOURCE_MAX_LENGTH,
  NEWSLETTER_TOKEN_PATTERN,
  SEARCH_QUERY_MAX_LENGTH,
  SEARCH_RESULT_TYPES,
} from '../constants/api.js';
import {
  CLIENT_TYPES,
  COUNTRIES,
  HEARD_ABOUT_OPTIONS,
  LEAD_CHANNELS,
  LEAD_FORMS,
  MEETING_OPTIONS,
} from '../constants/leads.js';
import {
  headingBlockSchema,
  imageBlockSchema,
  listBlockSchema,
  paragraphBlockSchema,
  quoteBlockSchema,
  tableBlockSchema,
} from './blocks.js';
import { faqSchema, slugSchema } from './common.js';
import { BLOCK_DOCUMENT_VERSION } from '../constants/content.js';

export const slugParamsSchema = z.object({ slug: slugSchema });

export const mediaRefSchema = z.object({
  url: z.url(),
  alt: z.string(),
  width: z.number().nullable(),
  height: z.number().nullable(),
});

export const resolvedImageBlockSchema = imageBlockSchema.extend({ media: mediaRefSchema });

export const resolvedDocumentSchema = z.object({
  version: z.literal(BLOCK_DOCUMENT_VERSION),
  blocks: z.array(
    z.discriminatedUnion('type', [
      paragraphBlockSchema,
      headingBlockSchema,
      listBlockSchema,
      quoteBlockSchema,
      resolvedImageBlockSchema,
      tableBlockSchema,
    ]),
  ),
});

export const seoResponseSchema = z.object({
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  noindex: z.boolean(),
  ogImage: mediaRefSchema.nullable(),
});

const namedLinkSchema = z.object({ slug: z.string(), name: z.string() });

export const settingsResponseSchema = z.record(z.string(), z.unknown());

const withMedia = z.object({ media: mediaRefSchema });

const titledTextSchema = z.object({ title: z.string(), text: z.string() });

export const pageCopySchema = z.object({
  about: z.object({
    heroTitle: z.string(),
    heroIntro: z.string(),
    storyTitle: z.string(),
    storyClosing: z.string(),
    filmTitle: z.string(),
    whyTitle: z.string(),
    whyPoints: z.array(titledTextSchema),
    leadershipTitle: z.string(),
    partnersTitle: z.string(),
  }),
  partners: z.object({
    heroTitle: z.string(),
    heroIntro: z.string(),
    introTitle: z.string(),
    intro: z.string(),
    firmNotes: z.record(z.string(), z.string()),
    signingLabel: z.string(),
    signingTitle: z.string(),
    signingText: z.string(),
    signingInsightSlug: z.string(),
  }),
  contact: z.object({ heroIntro: z.string() }),
  consultation: z.object({ heroIntro: z.string(), steps: z.array(titledTextSchema) }),
});

export const siteSettingsSchema = z.object({
  [SETTING_KEYS.firm]: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
  }),
  [SETTING_KEYS.contact]: z.object({
    phones: z.array(z.string()),
    email: z.string(),
    addressLine: z.string(),
  }),
  [SETTING_KEYS.newsletter]: z.object({ intro: z.string() }),
  [SETTING_KEYS.whatsApp]: z.object({ number: z.string(), message: z.string().nullable() }),
  [SETTING_KEYS.socials]: z.object({
    linkedIn: z.url(),
    facebook: z.url(),
    instagram: z.url(),
    youtube: z.url(),
  }),
  [SETTING_KEYS.booking]: z.object({ url: z.url() }),
  [SETTING_KEYS.tracking]: z.object({
    googleTagManagerId: z.string().nullable(),
    googleTagId: z.string().nullable(),
    metaPixelId: z.string().nullable(),
  }),
  [SETTING_KEYS.siteVerification]: z.object({ google: z.string(), bing: z.string() }),
  [SETTING_KEYS.cta]: z.object({
    heading: z.string(),
    text: z.string(),
    bookingLabel: z.string(),
  }),
  [SETTING_KEYS.seo]: withMedia.extend({ titleTemplate: z.string(), description: z.string() }),
  [SETTING_KEYS.aboutVideo]: withMedia.extend({
    url: z.url().nullable(),
    captionsUrl: z.url().nullable(),
  }),
  [SETTING_KEYS.pageCopy]: pageCopySchema,
});

export const officeResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  type: z.enum(OFFICE_TYPES),
  addressLine: z.string(),
  building: z.string().nullable(),
  city: z.string(),
  country: z.string(),
  poBox: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  mapEmbedUrl: z.string().nullable(),
});

export const pageResponseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  template: z.enum(PAGE_TEMPLATES),
  legalReviewStatus: z.enum(LEGAL_REVIEW_STATUSES),
  body: resolvedDocumentSchema,
  publishedAt: z.string().nullable(),
  seo: seoResponseSchema,
});

export const heroCardSchema = z.object({
  icon: z.enum(ICON_NAMES),
  title: z.string().min(1),
  text: z.string().min(1),
  href: z.string().startsWith('/'),
});

export const heroCardsSchema = z.array(heroCardSchema).length(HERO_CARD_COUNT);

export const homeResponseSchema = z.object({
  heroImage: mediaRefSchema,
  heroVideoUrl: z.url().nullable(),
  heroCards: heroCardsSchema,
  pageH1: z.string(),
  welcomeTitle: z.string(),
  welcomeBody: resolvedDocumentSchema,
  welcomeCtaLabel: z.string(),
  expertiseTitle: z.string(),
  expertiseIntro: z.string(),
  teamTitle: z.string(),
  teamIntro: z.string(),
  insightsTitle: z.string(),
  ctaTitle: z.string(),
  ctaBody: z.string(),
  title: z.string(),
  seo: seoResponseSchema,
});

export const teamSummarySchema = z.object({
  slug: z.string(),
  fullName: z.string(),
  displayName: z.string().nullable(),
  roleTitle: z.string(),
  memberType: z.enum(MEMBER_TYPES),
  isAdvocate: z.boolean(),
  hasProfile: z.boolean(),
  showOnHomepage: z.boolean(),
  homepageOrder: z.number().int(),
  featuredInMenu: z.boolean(),
  shortBio: z.string(),
  portrait: mediaRefSchema.nullable(),
  practiceAreas: z.array(namedLinkSchema),
});

export const insightSummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  readingMinutes: z.number(),
  publishedAt: z.string().nullable(),
  featuredImage: mediaRefSchema.nullable(),
  categories: z.array(namedLinkSchema),
  authors: z.array(z.object({ slug: z.string(), fullName: z.string(), hasProfile: z.boolean() })),
});

export const practiceAreaSummarySchema = z.object({
  slug: z.string(),
  name: z.string(),
  shortSummary: z.string(),
  heroImage: mediaRefSchema.nullable(),
  icon: z.enum(ICON_NAMES),
  cardTitle: z.string(),
  shortName: z.string(),
  cardSummary: z.string(),
});

export const practiceAreaDetailSchema = practiceAreaSummarySchema.extend({
  body: resolvedDocumentSchema,
  faq: faqSchema,
  team: z.array(teamSummarySchema),
  insights: z.array(insightSummarySchema),
  seo: seoResponseSchema,
});

export const teamListQuerySchema = z.object({ practiceArea: slugSchema.optional() });

export const teamListResponseSchema = z.object({
  total: z.number(),
  groups: z.array(
    z.object({ memberType: z.enum(MEMBER_TYPES), members: z.array(teamSummarySchema) }),
  ),
});

export const teamDetailSchema = teamSummarySchema.extend({
  longBio: resolvedDocumentSchema.nullable(),
  experience: z.array(z.string()).nullable(),
  education: z.array(z.string()).nullable(),
  admissions: z.array(z.string()).nullable(),
  memberships: z.array(z.string()).nullable(),
  languages: z.array(z.string()),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  whatsApp: z.string().nullable(),
  linkedInUrl: z.string().nullable(),
  bookingUrl: z.string().nullable(),
  office: officeResponseSchema.nullable(),
  insights: z.array(insightSummarySchema),
  seo: seoResponseSchema,
});

export const insightListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  category: slugSchema.optional(),
  practiceArea: slugSchema.optional(),
});

export const insightListResponseSchema = z.object({
  items: z.array(insightSummarySchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const insightDetailSchema = insightSummarySchema.extend({
  body: resolvedDocumentSchema,
  faq: faqSchema,
  practiceAreas: z.array(namedLinkSchema),
  related: z.array(insightSummarySchema),
  seo: seoResponseSchema,
});

export const categoryResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  insightCount: z.number(),
});

export const webinarListQuerySchema = z.object({ state: z.enum(WEBINAR_STATES).optional() });

export const webinarSummarySchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  state: z.enum(WEBINAR_STATES),
  startsAt: z.string().nullable(),
  timezone: z.string().nullable(),
  audience: z.string().nullable(),
  featuredOnHome: z.boolean(),
  featuredInMenu: z.boolean(),
  heroImage: mediaRefSchema.nullable(),
});

export const webinarDetailSchema = webinarSummarySchema.extend({
  body: resolvedDocumentSchema,
  faq: faqSchema,
  registrationUrl: z.string().nullable(),
  recordingUrl: z.string().nullable(),
  recordingGated: z.boolean(),
  panel: z.array(teamSummarySchema),
  seo: seoResponseSchema,
});

export const partnerResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string().nullable(),
  logo: mediaRefSchema.nullable(),
  gallery: z.array(mediaRefSchema),
});

export const awardResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  awarder: z.string(),
  year: z.number(),
  category: z.string(),
  image: mediaRefSchema.nullable(),
});

export const clientLogoResponseSchema = z.object({
  slug: z.string(),
  name: z.string(),
  altText: z.string(),
  logo: mediaRefSchema,
});

export const testimonialResponseSchema = z.object({
  id: z.string(),
  quote: z.string(),
  attribution: z.string(),
  location: z.string().nullable(),
});

export const faqEntryResponseSchema = z.object({
  question: z.string(),
  answer: z.string(),
  sourceType: z.enum(FAQ_SOURCE_TYPES),
  sourceTitle: z.string(),
  href: z.string().startsWith('/'),
});

export const resolveResponseSchema = z.object({ type: z.enum(SLUG_TYPES), slug: z.string() });

export const rootSlugsResponseSchema = z.array(
  resolveResponseSchema.extend({ noindex: z.boolean(), updatedAt: z.string() }),
);

export const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(SEARCH_QUERY_MAX_LENGTH),
});

export const searchResponseSchema = z.object({
  query: z.string(),
  results: z.array(
    z.object({
      type: z.enum(SEARCH_RESULT_TYPES),
      slug: z.string(),
      title: z.string(),
      excerpt: z.string(),
      hasProfile: z.boolean(),
    }),
  ),
});

export const redirectQuerySchema = z.object({ path: z.string().startsWith('/') });

export const redirectResponseSchema = z.object({
  fromPath: z.string(),
  toPath: z.string(),
  statusCode: z.number(),
});

export const redirectListResponseSchema = z.array(redirectResponseSchema);

export const attributionSchema = z.object({
  page: z.string().startsWith('/').max(CONTACT_SOURCE_MAX_LENGTH),
  utmSource: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
  utmCampaign: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
  referrer: z.string().max(CONTACT_MESSAGE_MAX_LENGTH).optional(),
  heardAbout: z.enum(HEARD_ABOUT_OPTIONS).optional(),
});

const personFields = {
  name: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH),
  email: z.string().trim().toLowerCase().pipe(z.email().max(CONTACT_FIELD_MAX_LENGTH)),
  website: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
};

export const contactFormSchema = z.object({
  ...personFields,
  phone: z.string().trim().max(CONTACT_FIELD_MAX_LENGTH).optional(),
  country: z.enum(COUNTRIES),
  message: z.string().trim().min(1).max(CONTACT_MESSAGE_MAX_LENGTH),
});

export const contactRequestSchema = contactFormSchema.extend(attributionSchema.shape);

export const contactResponseSchema = z.object({ received: z.literal(true) });

export const consultationFormSchema = z.object({
  ...personFields,
  phone: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH),
  country: z.enum(COUNTRIES),
  practiceArea: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH),
  clientType: z.enum(CLIENT_TYPES),
  preferredMeeting: z.enum(MEETING_OPTIONS),
  preferredDates: z.string().trim().min(1).max(CONTACT_FIELD_MAX_LENGTH),
  summary: z.string().trim().min(1).max(CONTACT_MESSAGE_MAX_LENGTH),
});

export const consultationRequestSchema = consultationFormSchema.extend(attributionSchema.shape);

export const recordingFormSchema = z.object(personFields);

export const recordingRequestSchema = recordingFormSchema.extend(attributionSchema.shape);

export const newsletterFormSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email().max(CONTACT_FIELD_MAX_LENGTH)),
  website: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
});

export const newsletterRequestSchema = newsletterFormSchema.extend(attributionSchema.shape);

export const newsletterResponseSchema = z.object({ received: z.literal(true) });

export const leadListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
  form: z.enum(LEAD_FORMS).optional(),
  channel: z.enum(LEAD_CHANNELS).optional(),
  source: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
  country: z.string().max(CONTACT_FIELD_MAX_LENGTH).optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export const leadRowSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  form: z.string(),
  name: z.string().nullable(),
  email: z.string(),
  phone: z.string().nullable(),
  country: z.string().nullable(),
  channel: z.string(),
  source: z.string(),
  campaign: z.string().nullable(),
  heardAbout: z.string().nullable(),
  page: z.string(),
});

export const leadListResponseSchema = z.object({
  items: z.array(leadRowSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

export const leadSummaryResponseSchema = z.object({
  forms: z.array(z.string()).readonly(),
  months: z.array(
    z.object({
      month: z.string(),
      total: z.number(),
      byChannel: z.record(z.string(), z.number()),
      byCountry: z.record(z.string(), z.number()),
    }),
  ),
});

export const newsletterConfirmQuerySchema = z.object({
  token: z.string().regex(NEWSLETTER_TOKEN_PATTERN),
});
