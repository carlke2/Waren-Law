import {
  BLOCK_DOCUMENT_VERSION,
  blockDocumentSchema,
  type Block,
  type BlockDocument,
} from '@waren/shared';
import { config } from './config.js';
import type { ParsedBlock } from './html-to-blocks.js';
import type { MediaLibrary } from './media.js';
import type { ImportReport } from './sync.js';

const TRACKING_PARAMETER = 'utm_source';

export function createHrefNormaliser(report: ImportReport): (href: string) => string {
  const siteHost = new URL(config.baseUrl).host;
  return (href) => {
    if (!/^https?:/i.test(href)) return href;
    const url = new URL(href);
    if (url.searchParams.has(TRACKING_PARAMETER)) {
      url.searchParams.delete(TRACKING_PARAMETER);
      report.fixes.add('Removed utm_source tracking parameters from article links');
    }
    return url.host === siteHost ? `${url.pathname}${url.search}${url.hash}` : url.toString();
  };
}

export async function resolveImages(
  blocks: readonly ParsedBlock[],
  media: MediaLibrary,
  baseName: string,
  fallbackAlt: string,
): Promise<Block[]> {
  const resolved: Block[] = [];
  let index = 0;
  for (const block of blocks) {
    if (block.type !== 'image') {
      resolved.push(block);
      continue;
    }
    index += 1;
    const record = await media.ensure({
      legacyUrl: block.src,
      baseName: `${baseName}-${index}`,
      altText: block.alt.trim() || fallbackAlt,
      ...(block.caption ? { caption: block.caption } : {}),
    });
    resolved.push({
      type: 'image',
      mediaId: record.id,
      ...(block.caption ? { caption: block.caption } : {}),
    });
  }
  return resolved;
}

const FIRST_HEADING_LEVEL = 2;

export function closeHeadingGaps(blocks: readonly Block[]): Block[] {
  let previous = FIRST_HEADING_LEVEL - 1;
  return blocks.map((block) => {
    if (block.type !== 'heading') return block;
    const level = Math.min(block.level, previous + 1) as typeof block.level;
    previous = level;
    return { ...block, level };
  });
}

export function toDocument(blocks: readonly Block[]): BlockDocument {
  return blockDocumentSchema.parse({
    version: BLOCK_DOCUMENT_VERSION,
    blocks: closeHeadingGaps(blocks),
  });
}
