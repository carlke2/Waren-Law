import { mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { config } from './config.js';
import type { Database } from './database.js';
import { ImportReport, syncRecord } from './sync.js';
import { fetchCached, type WpMedia } from './wp-client.js';

const MAX_IMAGE_WIDTH = 2000;
const WEBP_QUALITY = 82;
const WEBP_MIME_TYPE = 'image/webp';
const UPLOADS_PATH_MARKER = '/wp-content/uploads/';
const GENERATED_SIZE_SUFFIX = /-\d+x\d+(\.[a-z0-9]+)$/i;

export interface MediaRequest {
  legacyUrl: string;
  baseName: string;
  altText: string;
  caption?: string;
}

export function toKebabCase(value: string): string {
  return value
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export class MediaLibrary {
  private readonly byUrl: Map<string, WpMedia>;

  constructor(
    private readonly db: Database,
    private readonly report: ImportReport,
    private readonly library: readonly WpMedia[],
  ) {
    this.byUrl = new Map(library.map((item) => [decodeURI(item.source_url), item]));
  }

  uploadUrl(relativePath: string): string {
    return `${config.baseUrl}${UPLOADS_PATH_MARKER}${relativePath}`;
  }

  byId(id: number): WpMedia | undefined {
    return this.library.find((item) => item.id === id);
  }

  originalUrl(url: string): string {
    const decoded = decodeURI(url);
    if (this.byUrl.has(decoded)) return decoded;
    const withoutSize = decoded.replace(GENERATED_SIZE_SUFFIX, '$1');
    return this.byUrl.has(withoutSize) ? withoutSize : decoded;
  }

  private async uniqueFileName(baseName: string, legacyUrl: string): Promise<string> {
    const base = toKebabCase(baseName);
    for (let suffix = 1; ; suffix += 1) {
      const fileName = suffix === 1 ? `${base}.webp` : `${base}-${suffix}.webp`;
      const holder = await this.db.media.findUnique({ where: { fileName } });
      if (!holder || holder.legacyUrl === legacyUrl) return fileName;
    }
  }

  private async writeWebp(url: string, target: string) {
    await mkdir(config.uploadsDir, { recursive: true });
    const source = await fetchCached(encodeURI(url));
    return sharp(source)
      .rotate()
      .resize({ width: MAX_IMAGE_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(target);
  }

  async ensure(request: MediaRequest) {
    const legacyUrl = this.originalUrl(request.legacyUrl);
    const wordpressAlt = this.byUrl.get(legacyUrl)?.alt_text.trim();
    const existing = await this.db.media.findUnique({ where: { legacyUrl } });
    const fileName = existing?.fileName ?? (await this.uniqueFileName(request.baseName, legacyUrl));
    const target = path.join(config.uploadsDir, fileName);

    const onDisk = await stat(target).catch(() => null);
    const output =
      onDisk && existing
        ? { size: existing.sizeBytes, width: existing.width, height: existing.height }
        : await this.writeWebp(legacyUrl, target);

    const data = {
      fileName,
      originalName: path.basename(legacyUrl),
      mimeType: WEBP_MIME_TYPE,
      sizeBytes: output.size,
      width: output.width,
      height: output.height,
      altText: wordpressAlt || existing?.altText || request.altText,
      altTextNeedsReview: !wordpressAlt,
      caption: existing?.caption ?? request.caption ?? null,
      legacyUrl,
    };
    return syncRecord(this.report, 'media', data, {
      find: async () => existing,
      create: (values) => this.db.media.create({ data: values }),
      update: (row, values) => this.db.media.update({ where: { id: row.id }, data: values }),
    });
  }
}
