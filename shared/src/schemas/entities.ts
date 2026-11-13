import { z } from 'zod';
import {
  ADMIN_ROLES,
  CHANGE_ACTIONS,
  ENQUIRY_STATUSES,
  ICON_NAMES,
  MEDIA_KINDS,
  MEMBER_TYPES,
  OFFICE_TYPES,
  SLUG_TYPES,
  SUBSCRIBER_SOURCES,
  WEBINAR_STATES,
} from '../constants/content.js';
import { blockDocumentSchema } from './blocks.js';
import {
  faqSchema,
  legalReviewStatusSchema,
  publishingFieldsSchema,
  recordFieldsSchema,
  seoFieldsSchema,
  slugSchema,
  textListSchema,
} from './common.js';

const timestamps = recordFieldsSchema.pick({ createdAt: true, updatedAt: true });
const optionalMediaId = z.uuid().nullable();

export const settingSchema = z.object({
  ...timestamps.shape,
  key: z.string().min(1),
  value: z.unknown(),
  mediaId: optionalMediaId,
});

export const slugRegistrySchema = z.object({
  ...timestamps.shape,
  slug: slugSchema,
  type: z.enum(SLUG_TYPES),
  entityId: z.uuid(),
});

export const officeSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  type: z.enum(OFFICE_TYPES),
  addressLine: z.string().min(1),
  building: z.string().nullable(),
  city: z.string().min(1),
  country: z.string().min(1),
  poBox: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.email().nullable(),
  latitude: z.coerce.number().nullable(),
  longitude: z.coerce.number().nullable(),
  mapEmbedUrl: z.url().nullable(),
  sortOrder: z.number().int(),
  partnerId: z.uuid().nullable(),
});

export const pageSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  title: z.string().min(1),
  body: blockDocumentSchema,
  template: z.string().min(1),
  legalReviewStatus: legalReviewStatusSchema,
  legacyWordpressId: z.number().int().nullable(),
});

export const practiceAreaSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  shortSummary: z.string().min(1),
  body: blockDocumentSchema,
  faq: faqSchema,
  searchText: z.string(),
  sortOrder: z.number().int(),
  legalReviewStatus: legalReviewStatusSchema,
  legacyWordpressId: z.number().int().nullable(),
  heroImageId: optionalMediaId,
  categoryId: z.uuid().nullable(),
  icon: z.enum(ICON_NAMES),
  cardTitle: z.string(),
  shortName: z.string(),
  cardSummary: z.string(),
});

export const homeContentSchema = z.object({
  ...recordFieldsSchema.shape,
  pageId: z.uuid(),
  heroImageId: z.uuid(),
  heroVideoUrl: z.url().nullable(),
  heroCards: z.array(
    z.object({
      icon: z.enum(ICON_NAMES),
      title: z.string().min(1),
      text: z.string().min(1),
      href: z.string().startsWith('/'),
    }),
  ),
  pageH1: z.string().min(1),
  welcomeTitle: z.string().min(1),
  welcomeBody: blockDocumentSchema,
  welcomeCtaLabel: z.string().min(1),
  expertiseTitle: z.string().min(1),
  expertiseIntro: z.string().min(1),
  teamTitle: z.string().min(1),
  teamIntro: z.string().min(1),
  insightsTitle: z.string().min(1),
  ctaTitle: z.string().min(1),
  ctaBody: z.string().min(1),
  legalReviewStatus: legalReviewStatusSchema,
  ...publishingFieldsSchema.shape,
});

export const teamMemberSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  fullName: z.string().min(1),
  displayName: z.string().nullable(),
  roleTitle: z.string().min(1),
  memberType: z.enum(MEMBER_TYPES),
  isAdvocate: z.boolean(),
  shortBio: z.string(),
  longBio: blockDocumentSchema.nullable(),
  experience: textListSchema.nullable(),
  education: textListSchema.nullable(),
  admissions: textListSchema.nullable(),
  memberships: textListSchema.nullable(),
  languages: textListSchema,
  email: z.email().nullable(),
  phone: z.string().nullable(),
  whatsApp: z.string().nullable(),
  linkedInUrl: z.url().nullable(),
  bookingUrl: z.url().nullable(),
  hasProfile: z.boolean(),
  showOnHomepage: z.boolean(),
  homepageOrder: z.number().int(),
  featuredInMenu: z.boolean(),
  searchText: z.string(),
  sortOrder: z.number().int(),
  portraitId: optionalMediaId,
  officeId: z.uuid().nullable(),
});

export const insightSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  title: z.string().min(1),
  excerpt: z.string(),
  faq: faqSchema,
  body: blockDocumentSchema,
  searchText: z.string(),
  readingMinutes: z.number().int().positive(),
  featuredOnHome: z.boolean(),
  featuredInMenu: z.boolean(),
  legacyWordpressId: z.number().int().nullable(),
  legalReviewStatus: legalReviewStatusSchema,
  featuredImageId: optionalMediaId,
});

export const categorySchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  description: z.string().nullable(),
  sortOrder: z.number().int(),
});

export const webinarSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  ...seoFieldsSchema.shape,
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string(),
  body: blockDocumentSchema,
  startsAt: z.coerce.date().nullable(),
  timezone: z.string().nullable(),
  state: z.enum(WEBINAR_STATES),
  registrationUrl: z.url().nullable(),
  recordingUrl: z.url().nullable(),
  recordingGated: z.boolean(),
  faq: faqSchema,
  audience: z.string().nullable(),
  featuredOnHome: z.boolean(),
  featuredInMenu: z.boolean(),
  legalReviewStatus: legalReviewStatusSchema,
  legacyWordpressId: z.number().int().nullable(),
  heroImageId: optionalMediaId,
});

export const clientLogoSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  altText: z.string().min(1),
  permissionConfirmed: z.boolean(),
  permissionNote: z.string().nullable(),
  sortOrder: z.number().int(),
  visible: z.boolean(),
  logoId: z.uuid(),
});

export const partnerSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  description: z.string(),
  websiteUrl: z.url().nullable(),
  sortOrder: z.number().int(),
  logoId: optionalMediaId,
});

export const awardSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  slug: slugSchema,
  name: z.string().min(1),
  awarder: z.string().min(1),
  year: z.number().int(),
  category: z.string().min(1),
  visible: z.boolean(),
  approvalNote: z.string().nullable(),
  imageId: optionalMediaId,
  teamMemberId: z.uuid().nullable(),
});

export const testimonialSchema = z.object({
  ...recordFieldsSchema.shape,
  ...publishingFieldsSchema.shape,
  quote: z.string().min(1),
  attribution: z.string().min(1),
  location: z.string().nullable(),
  consentConfirmed: z.boolean(),
  approvedByFirm: z.boolean(),
  visible: z.boolean(),
  teamMemberId: z.uuid().nullable(),
  practiceAreaId: z.uuid().nullable(),
});

export const mediaSchema = z.object({
  ...recordFieldsSchema.shape,
  fileName: z.string().min(1),
  originalName: z.string().min(1),
  mimeType: z.string().min(1),
  kind: z.enum(MEDIA_KINDS),
  sizeBytes: z.number().int().nonnegative(),
  width: z.number().int().positive().nullable(),
  height: z.number().int().positive().nullable(),
  altText: z.string().min(1),
  altTextNeedsReview: z.boolean(),
  caption: z.string().nullable(),
  variants: z.record(z.string(), z.unknown()),
  legacyUrl: z.url().nullable(),
});

export const contactSubmissionSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  phone: z.string().nullable(),
  message: z.string().min(1),
  source: z.string().min(1),
  consentAt: z.coerce.date().nullable(),
  emailedAt: z.coerce.date().nullable(),
  status: z.enum(ENQUIRY_STATUSES),
  assignedToId: z.uuid().nullable(),
  internalNote: z.string().nullable(),
  handledAt: z.coerce.date().nullable(),
  handledById: z.uuid().nullable(),
  ...timestamps.shape,
});

export const subscriberSchema = z.object({
  ...recordFieldsSchema.shape,
  email: z.email(),
  firstName: z.string().nullable(),
  source: z.enum(SUBSCRIBER_SOURCES),
  consentAt: z.coerce.date(),
  unsubscribedAt: z.coerce.date().nullable(),
  confirmedAt: z.coerce.date().nullable(),
  confirmationTokenHash: z.string().nullable(),
  webinarId: z.uuid().nullable(),
});

export const redirectSchema = z.object({
  ...recordFieldsSchema.shape,
  fromPath: z.string().startsWith('/'),
  toPath: z.string().startsWith('/'),
  statusCode: z.number().int().min(300).max(399),
  note: z.string().nullable(),
});

export const adminUserSchema = z.object({
  ...recordFieldsSchema.shape,
  email: z.email(),
  name: z.string().min(1),
  role: z.enum(ADMIN_ROLES),
  passwordHash: z.string().min(1),
  totpSecret: z.string().nullable(),
  failedAttempts: z.number().int().nonnegative(),
  lockedUntil: z.coerce.date().nullable(),
  disabledAt: z.coerce.date().nullable(),
  lastLoginAt: z.coerce.date().nullable(),
});

export const sessionSchema = z.object({
  id: z.uuid(),
  tokenHash: z.string().min(1),
  expiresAt: z.coerce.date(),
  lastSeenAt: z.coerce.date(),
  adminUserId: z.uuid(),
  createdAt: z.coerce.date(),
});

export const passwordResetTokenSchema = z.object({
  id: z.uuid(),
  tokenHash: z.string().min(1),
  expiresAt: z.coerce.date(),
  usedAt: z.coerce.date().nullable(),
  adminUserId: z.uuid(),
  createdAt: z.coerce.date(),
});

export const changeHistorySchema = z.object({
  id: z.uuid(),
  entityType: z.string().min(1),
  entityId: z.string().min(1),
  action: z.enum(CHANGE_ACTIONS),
  before: z.unknown().nullable(),
  after: z.unknown().nullable(),
  summary: z.string().nullable(),
  adminUserId: z.uuid().nullable(),
  createdAt: z.coerce.date(),
});
