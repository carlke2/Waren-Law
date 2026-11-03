import type { Block } from '@waren/shared';
import { BANNED_CLAIMS, CTA_START, TEXT_FIXES } from '../curation.js';
import { blocksToPlainText, blockText, type ParsedBlock } from '../html-to-blocks.js';
import type { ImportReport } from '../sync.js';

export function cutAtCallToAction(blocks: readonly ParsedBlock[]): ParsedBlock[] {
  const index = blocks.findIndex((block) => CTA_START.test(blockText(block)));
  return index === -1 ? [...blocks] : blocks.slice(0, index);
}

function fixInline<T extends { text: string }>(piece: T, report: ImportReport): T {
  let { text } = piece;
  for (const fix of TEXT_FIXES) {
    if (text.includes(fix.from)) {
      text = text.replace(fix.from, fix.to);
      report.fixes.add(fix.note);
    }
  }
  return { ...piece, text };
}

export function applyTextFixes(
  blocks: readonly ParsedBlock[],
  report: ImportReport,
): ParsedBlock[] {
  return blocks.map((block) => {
    switch (block.type) {
      case 'paragraph':
      case 'heading':
      case 'quote':
        return { ...block, content: block.content.map((p) => fixInline(p, report)) };
      case 'list':
        return { ...block, items: block.items.map((i) => i.map((p) => fixInline(p, report))) };
      case 'table':
        return {
          ...block,
          rows: block.rows.map((r) => r.map((c) => c.map((p) => fixInline(p, report)))),
        };
      default:
        return block;
    }
  });
}

export function assertNoBannedClaims(blocks: readonly Block[] | string, where: string): void {
  const text = typeof blocks === 'string' ? blocks : blocksToPlainText(blocks);
  const hit = BANNED_CLAIMS.find((pattern) => pattern.test(text));
  if (hit) throw new Error(`${where} contains a claim that must not be imported: ${hit}`);
}

export function publishedAt(dateGmt: string): Date {
  return new Date(`${dateGmt}Z`);
}
