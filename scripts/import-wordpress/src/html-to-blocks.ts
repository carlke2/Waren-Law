import { load, type CheerioAPI } from 'cheerio';
import type { AnyNode, Element } from 'domhandler';
import type { Block, Inline } from '@waren/shared';

export type ParsedImage = { type: 'image'; src: string; alt: string; caption?: string };
export type ParsedBlock = Exclude<Block, { type: 'image' }> | ParsedImage;

type Mark = NonNullable<Inline['marks']>[number];

export interface ConvertOptions {
  skipWidgets?: readonly string[];
  normaliseHref?: (href: string) => string;
}

const SKIPPED_TAGS = new Set(['script', 'style', 'svg', 'noscript', 'form', 'iframe', 'button']);
const MARK_TAGS: Record<string, Mark> = {
  b: 'bold',
  strong: 'bold',
  i: 'italic',
  em: 'italic',
  u: 'underline',
};
const HEADING_LEVELS: Record<string, 2 | 3 | 4> = { h1: 2, h2: 2, h3: 3, h4: 4, h5: 4, h6: 4 };
const MAX_SPLIT_HEADING_LENGTH = 120;
const MIN_BODY_AFTER_PLAIN_HEADING = 80;
const LINE_ENDS_SENTENCE = /[.:;,!?]$/;
const INVISIBLE_CHARACTERS = /[\u200B-\u200D\u2060\uFEFF]/g;

export function normaliseText(text: string): string {
  return text
    .replace(INVISIBLE_CHARACTERS, '')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ');
}

function isElement(node: AnyNode): node is Element {
  return node.type === 'tag';
}

function sameFormat(a: Inline, b: Inline): boolean {
  return a.href === b.href && (a.marks ?? []).join() === (b.marks ?? []).join();
}

function tidyInline(pieces: Inline[]): Inline[] {
  const merged: Inline[] = [];
  for (const piece of pieces) {
    const previous = merged.at(-1);
    if (previous && sameFormat(previous, piece)) previous.text += piece.text;
    else merged.push({ ...piece });
  }
  for (const piece of merged) piece.text = normaliseText(piece.text);
  const first = merged[0];
  if (first) first.text = first.text.trimStart();
  const last = merged.at(-1);
  if (last) last.text = last.text.trimEnd();
  return merged.filter((piece) => piece.text.length > 0);
}

export function inlineText(pieces: readonly Inline[]): string {
  return pieces.map((piece) => piece.text).join('');
}

class Converter {
  readonly blocks: ParsedBlock[] = [];

  constructor(
    private readonly $: CheerioAPI,
    private readonly options: ConvertOptions,
  ) {}

  private inlineFrom(nodes: AnyNode[], marks: Mark[] = [], href?: string): Inline[] {
    const pieces: Inline[] = [];
    for (const node of nodes) {
      if (node.type === 'text') {
        pieces.push({
          text: node.data,
          ...(marks.length ? { marks } : {}),
          ...(href ? { href } : {}),
        });
      } else if (isElement(node) && !SKIPPED_TAGS.has(node.name) && node.name !== 'img') {
        pieces.push(...this.inlineOfElement(node, marks, href));
      }
    }
    return pieces;
  }

  private inlineOfElement(element: Element, marks: Mark[], href?: string): Inline[] {
    if (element.name === 'br') return [{ text: ' ', ...(href ? { href } : {}) }];
    const mark = MARK_TAGS[element.name];
    const nextMarks = mark && !marks.includes(mark) ? [...marks, mark] : marks;
    const linkTarget = element.name === 'a' ? this.linkTarget(element) : href;
    return this.inlineFrom(element.children, nextMarks, linkTarget);
  }

  private linkTarget(element: Element): string | undefined {
    const href = element.attribs.href?.trim();
    if (!href) return undefined;
    return this.options.normaliseHref ? this.options.normaliseHref(href) : href;
  }

  private addImage(element: Element, caption?: string): void {
    const src = element.attribs.src ?? element.attribs['data-src'];
    if (!src) return;
    this.blocks.push({
      type: 'image',
      src,
      alt: element.attribs.alt ?? '',
      ...(caption ? { caption } : {}),
    });
  }

  private addParagraph(element: Element): void {
    const childImages = this.$(element).find('img').toArray();
    const segments = splitOnLineBreaks(element.children);
    const [first, ...rest] = segments;
    if (first && rest.length && this.isHeadingSegment(first, rest.flat())) {
      const heading = tidyInline(this.inlineFrom(first).map(withoutMarks));
      this.blocks.push({ type: 'heading', level: 3, content: heading as [Inline, ...Inline[]] });
      this.pushParagraph(this.inlineFrom(rest.flat()));
    } else {
      this.pushParagraph(this.inlineFrom(element.children));
    }
    childImages.forEach((image) => this.addImage(image));
  }

  private isHeadingSegment(nodes: AnyNode[], rest: AnyNode[]): boolean {
    const lead = tidyInline(this.inlineFrom(nodes));
    const text = inlineText(lead);
    if (!text || text.length > MAX_SPLIT_HEADING_LENGTH) return false;
    if (lead.every((piece) => piece.marks?.includes('bold'))) return true;
    const body = inlineText(tidyInline(this.inlineFrom(rest)));
    return !LINE_ENDS_SENTENCE.test(text) && body.length >= MIN_BODY_AFTER_PLAIN_HEADING;
  }

  private pushParagraph(raw: Inline[]): void {
    const content = tidyInline(raw);
    if (content.length) this.blocks.push({ type: 'paragraph', content });
  }

  private addHeading(element: Element): void {
    const content = tidyInline(this.inlineFrom(element.children).map(withoutMarks));
    const level = HEADING_LEVELS[element.name];
    if (content.length && level) this.blocks.push({ type: 'heading', level, content });
  }

  private addList(element: Element): void {
    const items: Inline[][] = [];
    this.collectListItems(element, items);
    if (items.length) {
      this.blocks.push({ type: 'list', ordered: element.name === 'ol', items });
    }
  }

  private collectListItems(list: Element, items: Inline[][]): void {
    for (const item of list.children.filter(isElement)) {
      if (item.name !== 'li') continue;
      const own = item.children.filter((n) => !(isElement(n) && ['ul', 'ol'].includes(n.name)));
      const content = tidyInline(this.inlineFrom(own));
      if (content.length) items.push(content);
      for (const child of item.children.filter(isElement)) {
        if (child.name === 'ul' || child.name === 'ol') this.collectListItems(child, items);
      }
    }
  }

  private addTable(element: Element): void {
    const rows = this.$(element)
      .find('tr')
      .toArray()
      .map((row) =>
        this.$(row)
          .children('td,th')
          .toArray()
          .map((cell) => tidyInline(this.inlineFrom(cell.children))),
      )
      .filter((row) => row.length > 0);
    if (rows.length) {
      const header = this.$(element).find('th').length > 0;
      this.blocks.push({ type: 'table', header, rows });
    }
  }

  private addFigure(element: Element): void {
    const table = this.$(element).find('table').first().get(0);
    if (table) {
      this.addTable(table);
      return;
    }
    const caption = normaliseText(this.$(element).find('figcaption').text()).trim();
    this.$(element)
      .find('img')
      .toArray()
      .forEach((image) => this.addImage(image, caption || undefined));
  }

  private isSkippedWidget(element: Element): boolean {
    const widget = element.attribs['data-widget_type']?.split('.')[0];
    return widget !== undefined && (this.options.skipWidgets ?? []).includes(widget);
  }

  walk(nodes: AnyNode[]): void {
    for (const node of nodes) {
      if (node.type === 'text') {
        this.pushParagraph([{ text: node.data }]);
      } else if (isElement(node) && !SKIPPED_TAGS.has(node.name) && !this.isSkippedWidget(node)) {
        this.visit(node);
      }
    }
  }

  private visit(element: Element): void {
    const { name } = element;
    if (name in HEADING_LEVELS) this.addHeading(element);
    else if (name === 'p') this.addParagraph(element);
    else if (name === 'ul' || name === 'ol') this.addList(element);
    else if (name === 'table') this.addTable(element);
    else if (name === 'figure') this.addFigure(element);
    else if (name === 'img') this.addImage(element);
    else if (name === 'blockquote') {
      const content = tidyInline(this.inlineFrom(element.children));
      if (content.length) this.blocks.push({ type: 'quote', content });
    } else this.walk(element.children);
  }
}

function withoutMarks(piece: Inline): Inline {
  return { text: piece.text, ...(piece.href ? { href: piece.href } : {}) };
}

function splitOnLineBreaks(nodes: AnyNode[]): AnyNode[][] {
  const flattened = nodes.length === 1 && isElement(nodes[0]!) && nodes[0].name === 'span';
  const source = flattened ? (nodes[0] as Element).children : nodes;
  const segments: AnyNode[][] = [[]];
  for (const node of source) {
    if (isElement(node) && node.name === 'br') segments.push([]);
    else segments.at(-1)!.push(node);
  }
  return segments.filter((segment) => segment.length > 0);
}

export function htmlToBlocks(html: string, options: ConvertOptions = {}): ParsedBlock[] {
  const $ = load(html, null, false);
  const converter = new Converter($, options);
  converter.walk($.root().contents().toArray());
  return converter.blocks;
}

export function htmlToPlainText(html: string): string {
  return normaliseText(load(html, null, false).root().text()).trim();
}

export function blocksToPlainText(blocks: readonly ParsedBlock[] | readonly Block[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case 'paragraph':
        case 'heading':
        case 'quote':
          return inlineText(block.content);
        case 'list':
          return block.items.map(inlineText).join(' ');
        case 'table':
          return block.rows.map((row) => row.map(inlineText).join(' ')).join(' ');
        case 'image':
          return block.caption ?? '';
      }
    })
    .filter(Boolean)
    .join('\n');
}

export function blockText(block: ParsedBlock | Block): string {
  return blocksToPlainText([block] as ParsedBlock[]);
}
