import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { decideConsent, DESKTOP, loadAllImages, PHONE } from './helpers';

const REPORT_DIR = path.resolve(import.meta.dirname, '../../docs/reports/complete-build');
const CAPTURE = process.env.CAPTURE_SCREENS === 'true';

const PAGES = [
  { name: 'about-us', path: '/about-us/' },
  { name: 'our-partners', path: '/our-partners/' },
];

for (const { name, path: route } of PAGES) {
  test.describe(name, () => {
    test.beforeEach(async ({ context, baseURL }) => {
      await decideConsent(context, baseURL);
    });

    for (const viewport of [PHONE, DESKTOP]) {
      test(`works at ${viewport.width}`, async ({ page, baseURL }) => {
        await page.setViewportSize(viewport);
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await expect(page.locator('h1')).toHaveCount(1);
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          'href',
          new RegExp(`${route.replaceAll('?', '\\?')}$`),
        );
        await expect(page.getByText(/\[[A-Z][^\]]+\]/)).toHaveCount(0);
        await loadAllImages(page);
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow).toBeLessThanOrEqual(0);
        const broken = await page.evaluate(() =>
          [...document.images]
            .filter((image) => image.complete && image.naturalWidth === 0)
            .map(({ src }) => src),
        );
        expect(broken).toEqual([]);
        if (CAPTURE) {
          const directory = path.join(REPORT_DIR, name);
          mkdirSync(directory, { recursive: true });
          await page.screenshot({
            path: path.join(directory, `${viewport.width}.jpeg`),
            fullPage: true,
            type: 'jpeg',
            quality: 60,
            animations: 'disabled',
          });
        }
        expect(baseURL).toBeTruthy();
      });
    }
  });
}
