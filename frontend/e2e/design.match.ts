import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, type Page } from '@playwright/test';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { decideConsent, loadAllImages } from './helpers';

const REPO_ROOT = path.resolve(import.meta.dirname, '../..');
const SCREENSHOT_DIR = process.env.MATCH_SCREENSHOT_DIR;
const WIDTHS = [390, 768, 1280, 1440];
const VIEWPORT_HEIGHT = 900;
const PIXEL_THRESHOLD = 0.1;
const MATCH_PAGES = [
  {
    name: 'home',
    route: '/',
    design: 'home-design.html',
    outputDir: 'docs/reports/home-v3/match',
    sections: ['hero', 'welcome', 'expertise', 'partners', 'insights', 'recognition', 'cta'],
  },
  {
    name: 'about',
    route: '/about-us/',
    design: 'about-us.html',
    outputDir: 'docs/reports/complete-build/match-about',
    sections: [
      'hero',
      'story',
      'film',
      'statements',
      'why',
      'recognition',
      'leadership',
      'partners',
      'cta',
    ],
  },
];
const DESIGN_ONLY_FILL = [255, 0, 255];
const BUILD_ONLY_FILL = [0, 255, 255];
const STILL_PAGE_CSS =
  '*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important;caret-color:transparent!important}';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PageLayout {
  sections: Record<string, Rect>;
  photos: Rect[];
  foreground: Rect[];
  texts: { text: string; section: string; rects: Rect[] }[];
  brokenImages: string[];
  loadedFonts: string[];
  typography: {
    section: string;
    tag: string;
    text: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    offsetTop: number;
    height: number;
  }[];
}

interface LayoutSelectors {
  header: string;
  body: string;
  footer: string;
  placeholders: string;
}

const DESIGN_SELECTORS: LayoutSelectors = {
  header: 'header',
  body: 'section',
  footer: 'footer',
  placeholders:
    'section:first-of-type svg[preserveAspectRatio], [style*="repeating-linear-gradient"]',
};

const BUILD_SELECTORS: LayoutSelectors = {
  header: 'header',
  body: '#main > section',
  footer: 'footer',
  placeholders: '#main img, #main video',
};

function readLayout(
  page: Page,
  selectors: LayoutSelectors,
  bodySections: readonly string[],
): Promise<PageLayout> {
  return page.evaluate(
    async ({ selectors, bodySections }) => {
      await document.fonts.ready;
      const toPageRect = ({ x, y, width, height }: DOMRect) => ({
        x: x + window.scrollX,
        y: y + window.scrollY,
        width,
        height,
      });
      const required = (selector: string) => {
        const element = document.querySelector(selector);
        if (!element) throw new Error(`Missing ${selector}`);
        return element;
      };
      const header = required(selectors.header);
      const bodies = [...document.querySelectorAll(selectors.body)];
      if (bodies.length !== bodySections.length) {
        throw new Error(`Expected ${bodySections.length} sections, found ${bodies.length}`);
      }
      const sections: Record<string, Rect> = { header: toPageRect(header.getBoundingClientRect()) };
      bodySections.forEach((name, index) => {
        sections[name] = toPageRect(bodies[index].getBoundingClientRect());
      });
      const headerBottom = sections.header.y + sections.header.height;
      const heroBottom = sections.hero.y + sections.hero.height;
      sections.hero = { ...sections.hero, y: headerBottom, height: heroBottom - headerBottom };
      sections.footer = toPageRect(required(selectors.footer).getBoundingClientRect());

      const heroCards = [...bodies[0].querySelectorAll('h2')].map(
        (heading) => heading.closest('a, article, li, .hx-card') ?? heading.parentElement,
      );
      // Text on the photo can't be compared, because the photo itself is an allowed difference.
      const isOpaque = (element: Element) => {
        const alpha = getComputedStyle(element).backgroundColor.match(/[\d.]+(?=\)$)/);
        const { backgroundColor } = getComputedStyle(element);
        return backgroundColor.startsWith('rgb(') || Number(alpha?.[0] ?? 0) >= 0.9;
      };
      const foregroundElements = [
        ...[...header.querySelectorAll('a, button')].filter(isOpaque),
        ...heroCards.filter((card) => card !== null),
      ];

      const sectionAt = (x: number, y: number) =>
        Object.keys(sections).find((name) => {
          const area = sections[name];
          return y >= area.y && y < area.y + area.height && x >= area.x && x < area.x + area.width;
        });
      const texts: PageLayout['texts'] = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const parent = node.parentElement;
        const text = (node.textContent ?? '').replace(/\s+/g, ' ').trim();
        if (!parent || !text || parent.closest('script, style, noscript, helmet')) continue;
        const style = getComputedStyle(parent);
        if (style.visibility === 'hidden' || style.display === 'none') continue;
        const range = document.createRange();
        range.selectNodeContents(node);
        const rects = [...range.getClientRects()]
          .filter(({ width, height }) => width > 1 && height > 1)
          .map(toPageRect);
        if (rects.length === 0) continue;
        const section = sectionAt(rects[0].x + 1, rects[0].y + 1);
        if (section) texts.push({ text: text.toLowerCase(), section, rects });
      }

      const images = [...document.images].filter((image) => image.getClientRects().length > 0);
      const typography = [...document.querySelectorAll('h1, h2, h3, h4, p')].flatMap((element) => {
        const rect = toPageRect(element.getBoundingClientRect());
        const section = sectionAt(rect.x + 1, rect.y + 1);
        if (!section || rect.width <= 1 || rect.height <= 1) return [];
        const { fontFamily, fontSize, fontWeight, lineHeight } = getComputedStyle(element);
        return [
          {
            section,
            tag: element.tagName.toLowerCase(),
            text: (element.textContent ?? '').trim().slice(0, 40),
            fontFamily,
            fontSize,
            fontWeight,
            lineHeight,
            offsetTop: Math.round(rect.y - sections[section].y),
            height: Math.round(rect.height),
          },
        ];
      });
      return {
        typography,
        sections,
        photos: [...document.querySelectorAll(selectors.placeholders)]
          .filter((element) => element.getClientRects().length > 0)
          .map((element) => toPageRect(element.getBoundingClientRect())),
        foreground: foregroundElements.map((element) =>
          toPageRect(element.getBoundingClientRect()),
        ),
        texts,
        brokenImages: images
          .filter((image) => image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
        loadedFonts: [...document.fonts]
          .filter(({ status }) => status === 'loaded')
          .map(({ family, weight }) => `${family} ${weight}`),
      };
    },
    { selectors, bodySections },
  );
}

async function capture(
  page: Page,
  file: string,
  selectors: LayoutSelectors,
  bodySections: readonly string[],
) {
  await page.addStyleTag({ content: STILL_PAGE_CSS });
  await page.evaluate(() => {
    for (const image of document.images) image.loading = 'eager';
  });
  await loadAllImages(page);
  await page.waitForFunction(() => [...document.images].every((image) => image.complete));
  const layout = await readLayout(page, selectors, bodySections);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
  return { layout, image: PNG.sync.read(readFileSync(file)) };
}

function cropOnto(source: PNG, area: Rect, width: number, height: number, fill: number[]) {
  const canvas = new PNG({ width, height });
  for (let offset = 0; offset < canvas.data.length; offset += 4) {
    canvas.data.set([...fill, 255], offset);
  }
  const left = Math.round(area.x);
  const top = Math.round(area.y);
  const copyWidth = Math.min(width, Math.round(area.width), source.width - left);
  const copyHeight = Math.min(height, Math.round(area.height), source.height - top);
  PNG.bitblt(source, canvas, left, top, copyWidth, copyHeight, 0, 0);
  return canvas;
}

function paint(mask: Uint8Array, width: number, height: number, rect: Rect, value: number) {
  const left = Math.max(0, Math.floor(rect.x));
  const right = Math.min(width, Math.ceil(rect.x + rect.width));
  const top = Math.max(0, Math.floor(rect.y));
  const bottom = Math.min(height, Math.ceil(rect.y + rect.height));
  for (let y = top; y < bottom; y += 1) mask.fill(value, y * width + left, y * width + right);
}

function relativeTo(rect: Rect, origin: Rect): Rect {
  return { ...rect, x: rect.x - origin.x, y: rect.y - origin.y };
}

function differingTexts(design: PageLayout, built: PageLayout, section?: string) {
  const inScope = ({ section: name }: { section: string }) => !section || name === section;
  const designTexts = new Set(design.texts.filter(inScope).map(({ text }) => text));
  const builtTexts = new Set(built.texts.filter(inScope).map(({ text }) => text));
  return {
    designOnly: design.texts.filter(inScope).filter(({ text }) => !builtTexts.has(text)),
    builtOnly: built.texts.filter(inScope).filter(({ text }) => !designTexts.has(text)),
  };
}

function expectedMask(
  width: number,
  height: number,
  design: PageLayout,
  built: PageLayout,
  designOrigin: Rect,
  builtOrigin: Rect,
  section?: string,
) {
  const mask = new Uint8Array(width * height);
  const sides = [
    { layout: design, origin: designOrigin },
    { layout: built, origin: builtOrigin },
  ];
  for (const { layout, origin } of sides) {
    for (const photo of layout.photos) paint(mask, width, height, relativeTo(photo, origin), 1);
  }
  for (const { layout, origin } of sides) {
    for (const card of layout.foreground) paint(mask, width, height, relativeTo(card, origin), 0);
  }
  const { designOnly, builtOnly } = differingTexts(design, built, section);
  for (const { rects } of designOnly) {
    for (const rect of rects) paint(mask, width, height, relativeTo(rect, designOrigin), 1);
  }
  for (const { rects } of builtOnly) {
    for (const rect of rects) paint(mask, width, height, relativeTo(rect, builtOrigin), 1);
  }
  return mask;
}

function compare(designCrop: PNG, builtCrop: PNG, mask: Uint8Array, diffFile: string) {
  const { width, height } = designCrop;
  const diff = new PNG({ width, height });
  const different = pixelmatch(designCrop.data, builtCrop.data, diff.data, width, height, {
    threshold: PIXEL_THRESHOLD,
  });
  writeFileSync(diffFile, PNG.sync.write(diff));
  const marks = new PNG({ width, height });
  pixelmatch(designCrop.data, builtCrop.data, marks.data, width, height, {
    threshold: PIXEL_THRESHOLD,
    diffMask: true,
  });
  let excluded = 0;
  let differentOutsideExpected = 0;
  for (let pixel = 0; pixel < mask.length; pixel += 1) {
    if (mask[pixel]) excluded += 1;
    else if (marks.data[pixel * 4 + 3] > 0) differentOutsideExpected += 1;
  }
  const total = width * height;
  const compared = total - excluded;
  return {
    width,
    height,
    rawMatch: 100 * (1 - different / total),
    adjustedMatch: compared > 0 ? 100 * (1 - differentOutsideExpected / compared) : null,
    excludedShare: (100 * excluded) / total,
  };
}

for (const { name, route, design: designName, outputDir, sections: bodySections } of MATCH_PAGES) {
  test(`measure ${name} against its design`, async ({ browser, baseURL }) => {
    const OUTPUT_DIR = path.join(REPO_ROOT, outputDir);
    const shots = SCREENSHOT_DIR ?? OUTPUT_DIR;
    const DESIGN_FILE = path.join(REPO_ROOT, 'docs/design/reference', designName);
    const SECTIONS = ['header', ...bodySections, 'footer'];
    mkdirSync(OUTPUT_DIR, { recursive: true });
    mkdirSync(shots, { recursive: true });
    const results = [];

    for (const width of WIDTHS) {
      const viewport = { width, height: VIEWPORT_HEIGHT };
      const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
      await decideConsent(context, baseURL);
      const designPage = await context.newPage();
      await designPage.goto(pathToFileURL(DESIGN_FILE).href, { waitUntil: 'networkidle' });
      const design = await capture(
        designPage,
        path.join(shots, `${name}-design-${width}.png`),
        DESIGN_SELECTORS,
        bodySections,
      );
      const builtPage = await context.newPage();
      await builtPage.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
      const built = await capture(
        builtPage,
        path.join(shots, `${name}-built-${width}.png`),
        BUILD_SELECTORS,
        bodySections,
      );
      await context.close();

      const pageWidth = Math.max(design.image.width, built.image.width);
      const pageHeight = Math.max(design.image.height, built.image.height);
      const origin = { x: 0, y: 0, width: pageWidth, height: pageHeight };
      const whole = compare(
        cropOnto(design.image, origin, pageWidth, pageHeight, DESIGN_ONLY_FILL),
        cropOnto(built.image, origin, pageWidth, pageHeight, BUILD_ONLY_FILL),
        expectedMask(pageWidth, pageHeight, design.layout, built.layout, origin, origin),
        path.join(OUTPUT_DIR, `diff-${width}-page.png`),
      );

      const sections: Record<string, ReturnType<typeof compare> & Record<string, unknown>> = {};
      for (const section of SECTIONS) {
        const designArea = design.layout.sections[section];
        const builtArea = built.layout.sections[section];
        const cropWidth = Math.round(Math.max(designArea.width, builtArea.width));
        const cropHeight = Math.round(Math.max(designArea.height, builtArea.height));
        const result = compare(
          cropOnto(design.image, designArea, cropWidth, cropHeight, DESIGN_ONLY_FILL),
          cropOnto(built.image, builtArea, cropWidth, cropHeight, BUILD_ONLY_FILL),
          expectedMask(
            cropWidth,
            cropHeight,
            design.layout,
            built.layout,
            designArea,
            builtArea,
            section,
          ),
          path.join(OUTPUT_DIR, `diff-${width}-${section}.png`),
        );
        const { designOnly, builtOnly } = differingTexts(design.layout, built.layout, section);
        sections[section] = {
          ...result,
          designHeight: Math.round(designArea.height),
          builtHeight: Math.round(builtArea.height),
          designTextOnly: designOnly.map(({ text }) => text),
          builtTextOnly: builtOnly.map(({ text }) => text),
        };
      }

      results.push({
        width,
        designPageHeight: design.image.height,
        builtPageHeight: built.image.height,
        designPageWidth: design.image.width,
        builtPageWidth: built.image.width,
        loadedFonts: { design: design.layout.loadedFonts, built: built.layout.loadedFonts },
        typography: { design: design.layout.typography, built: built.layout.typography },
        brokenImages: built.layout.brokenImages,
        whole,
        sections,
      });
    }

    writeFileSync(path.join(OUTPUT_DIR, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);
  });
}
