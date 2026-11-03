import { BLOCK_DOCUMENT_VERSION, blockDocumentSchema } from '@waren/shared';

describe('shared block schema', () => {
  it('accepts a valid document', () => {
    const document = {
      version: BLOCK_DOCUMENT_VERSION,
      blocks: [{ type: 'heading', level: 2, content: [{ text: 'Title' }] }],
    };
    expect(blockDocumentSchema.safeParse(document).success).toBe(true);
  });

  it('rejects an H1 inside a body, because the template owns it', () => {
    const document = {
      version: BLOCK_DOCUMENT_VERSION,
      blocks: [{ type: 'heading', level: 1, content: [{ text: 'Title' }] }],
    };
    expect(blockDocumentSchema.safeParse(document).success).toBe(false);
  });
});
