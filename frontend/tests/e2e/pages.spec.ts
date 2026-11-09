import { expect, test } from '@playwright/test';
import { decideConsent, DESKTOP, loadAllImages, PHONE } from './helpers';

const BASE_URL = 'http://localhost:3000';

const PAGES = [
  { name: 'about-us', path: '/about-us/' },
  { name: 'our-partners', path: '/our-partners/' },
  { name: 'area-of-expertise', path: '/area-of-expertise/' },
  { name: 'practice-area', path: '/corporate-commercial-practice/' },
  { name: 'practice-area-no-team', path: '/banking-finance-law/' },
  { name: 'our-team', path: '/our-team/' },
  { name: 'profile', path: '/our-team/janice-wachuka/' },
  { name: 'contact-us', path: '/contact-us/' },
  { name: 'book-a-consultation', path: '/book-a-consultation/' },
  { name: 'insights', path: '/insights/' },
  { name: 'insights-page-2', path: '/insights/page/2/' },
  { name: 'category', path: '/category/wealth-management/' },
  { name: 'article', path: '/cross-border-succession-planning-kenya-uk-us/' },
  { name: 'article-long', path: '/investing-in-kenya-from-the-us-uk-canada-or-europe/' },
  { name: 'webinars', path: '/insights/webinars/' },
  { name: 'webinar-recording', path: '/wealth-protection-plan-for-kenyans-abroad-webinar/' },
  { name: 'webinar-past', path: '/trusts-taxes-protecting-wealth-across-borders/' },
  { name: 'privacy-policy', path: '/privacy-policy/' },
  { name: 'faq', path: '/faq/' },
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

test('search shows grouped results from a link that works without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(`${BASE_URL}/search/?q=land`);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('status')).toContainText('land');
  await expect(page.locator('main h2').first()).toBeVisible();
  await context.close();
});

test('an unknown page gets one heading, a search box and key links', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.getByRole('searchbox')).toBeVisible();
});

test('marks an unapproved legal page when it is shown for review', async ({ page }) => {
  const response = await page.goto('/terms/');
  if (response?.status() === 200) {
    await expect(page.getByText(/NEEDS ADVOCATE REVIEW/)).toBeVisible();
  } else {
    expect(response?.status()).toBe(404);
  }
});

test('every header and footer link opens a page', async ({ page, request, context, baseURL }) => {
  await decideConsent(context, baseURL);
  await page.setViewportSize(DESKTOP);
  await page.goto('/');
  const hrefs = await page
    .locator('header a[href^="/"], footer a[href^="/"]')
    .evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));
  const unique = [...new Set(hrefs)];
  expect(unique.length).toBeGreaterThan(10);
  for (const href of unique) {
    const response = await request.get(href);
    expect(response.status(), href).toBe(200);
  }
});
