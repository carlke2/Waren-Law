import { z } from 'zod';
import { CONTENT_STATUSES, LEGAL_REVIEW_STATUSES, SLUG_PATTERN } from '../constants/content.js';

export const slugSchema = z.string().regex(SLUG_PATTERN);
export const contentStatusSchema = z.enum(CONTENT_STATUSES);
export const legalReviewStatusSchema = z.enum(LEGAL_REVIEW_STATUSES);

export const recordFieldsSchema = z.object({
  id: z.uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const publishingFieldsSchema = z.object({
  status: contentStatusSchema,
  publishedAt: z.coerce.date().nullable(),
});

export const seoFieldsSchema = z.object({
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  canonicalUrl: z.string().nullable(),
  noindex: z.boolean(),
  ogImageId: z.uuid().nullable(),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});
export const faqSchema = z.array(faqItemSchema);

export const textListSchema = z.array(z.string().min(1));
