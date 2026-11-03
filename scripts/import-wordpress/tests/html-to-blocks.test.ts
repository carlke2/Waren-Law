import { blocksToPlainText, htmlToBlocks } from '../src/html-to-blocks.js';

describe('htmlToBlocks', () => {
  it('converts headings, keeping the H1 for the page template', () => {
    expect(htmlToBlocks('<h1>Title</h1><h3>Part</h3><h6>Note</h6>')).toEqual([
      { type: 'heading', level: 2, content: [{ text: 'Title' }] },
      { type: 'heading', level: 3, content: [{ text: 'Part' }] },
      { type: 'heading', level: 4, content: [{ text: 'Note' }] },
    ]);
  });

  it('keeps bold, italic and links as inline marks', () => {
    const [block] = htmlToBlocks('<p>A <strong>bold</strong> <a href="/x/"><em>link</em></a></p>');
    expect(block).toEqual({
      type: 'paragraph',
      content: [
        { text: 'A ' },
        { text: 'bold', marks: ['bold'] },
        { text: ' ' },
        { text: 'link', marks: ['italic'], href: '/x/' },
      ],
    });
  });

  it('flattens nested lists and drops empty items', () => {
    const [block] = htmlToBlocks('<ul><li>One<ul><li>Two</li></ul></li><li> </li></ul>');
    expect(block).toEqual({
      type: 'list',
      ordered: false,
      items: [[{ text: 'One' }], [{ text: 'Two' }]],
    });
  });

  it('removes scripts, styles, svg and skipped Elementor widgets', () => {
    const html =
      '<script>alert(1)</script><svg><text>x</text></svg>' +
      '<div data-widget_type="testimonial.default"><p>Praise</p></div><p>Kept</p>';
    expect(blocksToPlainText(htmlToBlocks(html, { skipWidgets: ['testimonial'] }))).toBe('Kept');
  });

  it('splits a bold lead line into a heading', () => {
    expect(htmlToBlocks('<p><strong>Lead</strong><br>Rest of the text.</p>')).toEqual([
      { type: 'heading', level: 3, content: [{ text: 'Lead' }] },
      { type: 'paragraph', content: [{ text: 'Rest of the text.' }] },
    ]);
  });

  it('splits a plain lead line only when a long body follows', () => {
    const body =
      'Executing seamless land transactions requires care at every single stage of the work.';
    expect(htmlToBlocks(`<p>Property Transfers<br>${body}</p>`)).toEqual([
      { type: 'heading', level: 3, content: [{ text: 'Property Transfers' }] },
      { type: 'paragraph', content: [{ text: body }] },
    ]);
    expect(htmlToBlocks('<p>Jane Doe<br>Nairobi</p>')).toEqual([
      { type: 'paragraph', content: [{ text: 'Jane Doe Nairobi' }] },
    ]);
  });

  it('normalises non-breaking and zero-width characters', () => {
    const [block] = htmlToBlocks('<p>a b​c</p>');
    expect(block).toEqual({ type: 'paragraph', content: [{ text: 'a bc' }] });
  });

  it('applies a link normaliser', () => {
    const [block] = htmlToBlocks('<p><a href="https://x.test/a">go</a></p>', {
      normaliseHref: () => '/a/',
    });
    expect(block).toEqual({ type: 'paragraph', content: [{ text: 'go', href: '/a/' }] });
  });

  it('reads tables, with a header when th cells exist', () => {
    const [block] = htmlToBlocks('<table><tr><th>H</th></tr><tr><td>C</td></tr></table>');
    expect(block).toEqual({
      type: 'table',
      header: true,
      rows: [[[{ text: 'H' }]], [[{ text: 'C' }]]],
    });
  });
});
