import type { Inline } from '@waren/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { SiteLink } from '@/components/ui/site-link';
import type { ContentBlock } from '@/lib/content/sections';
import { cx } from '@/lib/utils/cx';
import { isExternalLink } from '@/lib/utils/links';

const CONTENT_IMAGE_SIZES = '(min-width: 48rem) 47.5rem, 100vw';

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return isExternalLink(href) ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <SiteLink href={href}>{children}</SiteLink>
  );
}

function renderInline(piece: Inline, key: number): ReactNode {
  let node: ReactNode = piece.text;
  if (piece.marks?.includes('bold')) node = <strong>{node}</strong>;
  if (piece.marks?.includes('italic')) node = <em>{node}</em>;
  if (piece.marks?.includes('underline')) node = <u>{node}</u>;
  if (piece.href) node = <InlineLink href={piece.href}>{node}</InlineLink>;
  return <span key={key}>{node}</span>;
}

const renderInlines = (pieces: readonly Inline[]) => pieces.map(renderInline);

function renderBlock(block: ContentBlock, key: number): ReactNode {
  switch (block.type) {
    case 'paragraph':
      return <p key={key}>{renderInlines(block.content)}</p>;
    case 'heading': {
      const Tag = `h${block.level}` as const;
      return <Tag key={key}>{renderInlines(block.content)}</Tag>;
    }
    case 'list': {
      const Tag = block.ordered ? 'ol' : 'ul';
      return (
        <Tag key={key}>
          {block.items.map((item, index) => (
            <li key={index}>{renderInlines(item)}</li>
          ))}
        </Tag>
      );
    }
    case 'quote':
      return <blockquote key={key}>{renderInlines(block.content)}</blockquote>;
    case 'image':
      return (
        <figure key={key}>
          <Image
            src={block.media.url}
            alt={block.media.alt}
            width={block.media.width ?? undefined}
            height={block.media.height ?? undefined}
            sizes={CONTENT_IMAGE_SIZES}
            className="h-auto w-full"
          />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      );
    case 'table': {
      const [first, ...rest] = block.rows;
      const bodyRows = block.header ? rest : block.rows;
      return (
        <div key={key} className="table-scroll">
          <table>
            {block.header && first ? (
              <thead>
                <tr>
                  {first.map((cell, index) => (
                    <th key={index} scope="col">
                      {renderInlines(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {bodyRows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{renderInlines(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export function BlockRenderer({
  blocks,
  className,
}: {
  blocks: readonly ContentBlock[];
  className?: string;
}) {
  return <div className={cx('prose-body', className)}>{blocks.map(renderBlock)}</div>;
}
