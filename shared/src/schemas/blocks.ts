import { z } from 'zod';
import { BLOCK_DOCUMENT_VERSION, HEADING_LEVELS, INLINE_MARKS } from '../constants/content.js';

export const inlineSchema = z.object({
  text: z.string().min(1),
  marks: z.array(z.enum(INLINE_MARKS)).optional(),
  href: z.string().min(1).optional(),
});

const inlineContentSchema = z.array(inlineSchema).min(1);

export const paragraphBlockSchema = z.object({
  type: z.literal('paragraph'),
  content: inlineContentSchema,
});

export const headingBlockSchema = z.object({
  type: z.literal('heading'),
  level: z.union(HEADING_LEVELS.map((level) => z.literal(level))),
  content: inlineContentSchema,
});

export const listBlockSchema = z.object({
  type: z.literal('list'),
  ordered: z.boolean(),
  items: z.array(inlineContentSchema).min(1),
});

export const quoteBlockSchema = z.object({
  type: z.literal('quote'),
  content: inlineContentSchema,
});

export const imageBlockSchema = z.object({
  type: z.literal('image'),
  mediaId: z.uuid(),
  caption: z.string().optional(),
});

export const tableBlockSchema = z.object({
  type: z.literal('table'),
  header: z.boolean(),
  rows: z.array(z.array(z.array(inlineSchema))).min(1),
});

export const blockSchema = z.discriminatedUnion('type', [
  paragraphBlockSchema,
  headingBlockSchema,
  listBlockSchema,
  quoteBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
]);

export const blockDocumentSchema = z.object({
  version: z.literal(BLOCK_DOCUMENT_VERSION),
  blocks: z.array(blockSchema),
});
