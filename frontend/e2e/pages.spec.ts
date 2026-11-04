import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { decideConsent, DESKTOP, loadAllImages, PHONE } from './helpers';

const REPORT_DIR = path.resolve(import.meta.dirname, '../../docs/reports/complete-build');
const CAPTURE = process.env.CAPTURE_SCREENS === 'true';
const BASE_URL = 'http://localhost:3000';

const PAGES = [
  { name: 'about-us', path: '/about-us/' },
  { name: 'our-partners', path: '/our-partners/' },
  { name: 'area-of-expertise', path: '/area-of-expertise/' },
  { name: 'practice-area', path: '/corporate-commercial-practice/' },
  { name: 'practice-area-no-team', path: '/banking-finance-law/' },
  { name: 'our-team', path: '/our-team/' },
  { name: 'profile', path: '/our-team/janice-wachuka/' },
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

test('filters the team by a shareable link that works without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  const response = await page.goto(`${BASE_URL}/our-team/?practiceArea=mining-energy-law`);
  expect(response?.status()).toBe(200);
  expect(page.url()).toContain('?practiceArea=mining-energy-law');
  await expect(page.locator('nav a[aria-current="page"]').last()).toContainText('Mining');
  await context.close();
});

test('keeps the old profile URL as one permanent redirect', async ({ request }) => {
  const response = await request.get('/ephraim-ndegwa/', { maxRedirects: 0 });
  expect(response.status()).toBe(301);
  expect(response.headers().location).toMatch(/\/our-team\/ephraim-ndegwa\/$/);
});
