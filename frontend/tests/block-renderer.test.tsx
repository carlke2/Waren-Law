import { render, screen } from '@testing-library/react';
import { BlockRenderer } from '@/components/site/block-renderer';
import type { ContentBlock } from '@/lib/content/sections';

const media = { url: 'https://cdn.test/a.webp', alt: 'Alt text', width: 100, height: 50 };

vi.mock('next/image', async () => {
  const { createElement } = await import('react');
  return {
    default: ({ alt, src }: { alt: string; src: string }) => createElement('img', { alt, src }),
  };
});

const blocks: ContentBlock[] = [
  { type: 'heading', level: 2, content: [{ text: 'Title' }] },
  {
    type: 'paragraph',
    content: [
      { text: 'Plain ' },
      { text: 'bold', marks: ['bold'] },
      { text: ' ' },
      { text: 'inside', href: '/inside/' },
      { text: ' ' },
      { text: 'outside', href: 'https://out.test/' },
    ],
  },
  { type: 'list', ordered: true, items: [[{ text: 'One' }]] },
  { type: 'list', ordered: false, items: [[{ text: 'Two' }]] },
  { type: 'quote', content: [{ text: 'Quote' }] },
  { type: 'image', mediaId: 'id', caption: 'Caption', media },
  {
    type: 'table',
    header: true,
    rows: [[[{ text: 'Head' }]], [[{ text: 'Cell' }]]],
  },
  { type: 'table', header: false, rows: [[[{ text: 'Only cell' }]]] },
];

describe('BlockRenderer', () => {
  it('renders every block type the importer produces', () => {
    const { container } = render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('bold').tagName).toBe('STRONG');
    expect(container.querySelector('ol li')).toHaveTextContent('One');
    expect(container.querySelector('ul li')).toHaveTextContent('Two');
    expect(container.querySelector('blockquote')).toHaveTextContent('Quote');
    expect(screen.getByAltText('Alt text')).toBeInTheDocument();
    expect(screen.getByText('Caption').tagName).toBe('FIGCAPTION');
    expect(screen.getByRole('columnheader', { name: 'Head' })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Only cell' })).toBeInTheDocument();
  });

  it('opens outside links in a new tab but not inside links', () => {
    render(<BlockRenderer blocks={blocks} />);
    expect(screen.getByRole('link', { name: 'outside' })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'inside' })).not.toHaveAttribute('target');
  });
});
