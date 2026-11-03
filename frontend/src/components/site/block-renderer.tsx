import type { Inline } from '@waren/shared';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { Prose } from '@/components/ui/typography';
import { SmartLink } from '@/components/ui/smart-link';
import type { ContentBlock } from '@/lib/content/sections';

const CONTENT_IMAGE_SIZES = '(min-width: 48rem) 42rem, 100vw';

function renderInline(piece: Inline, key: number): ReactNode {
  let node: ReactNode = piece.text;
  if (piece.marks?.includes('bold')) node = <strong>{node}</strong>;
  if (piece.marks?.includes('italic')) node = <em>{node}</em>;
  if (piece.marks?.includes('underline')) node = <u>{node}</u>;
  if (piece.href) node = <SmartLink href={piece.href}>{node}</SmartLink>;
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
            className="h-auto w-full rounded-md"
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
  return <Prose className={className}>{blocks.map(renderBlock)}</Prose>;
}
