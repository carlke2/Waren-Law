import { expect, test, type Page } from '@playwright/test';
import { ROUTES } from '@waren/shared';
import { CONSENT_COOKIE } from '../../src/lib/utils/consent/consent';
import { dictionary } from '../../src/lib/utils/dictionary';
import { DESKTOP, loadAllImages, PHONE } from './helpers';

const text = dictionary.consent;
const TRACKER = /googletagmanager|google-analytics|doubleclick|facebook\.net|facebook\.com\/tr/;

function watchTrackers(page: Page): string[] {
  const seen: string[] = [];
  void page.route(TRACKER, (route) => {
    seen.push(route.request().url());
    return route.abort();
  });
  return seen;
}

test.use({ viewport: DESKTOP });

test('sends no Google or Meta requests before Accept, and some after', async ({ page }) => {
  const trackers = watchTrackers(page);
  await page.goto(ROUTES.home);
  await loadAllImages(page);
  expect(trackers).toEqual([]);
  await page.getByRole('button', { name: text.accept, exact: true }).click();
  await expect.poll(() => trackers.some((url) => url.includes('googletagmanager'))).toBe(true);
  await expect.poll(() => trackers.some((url) => url.includes('facebook'))).toBe(true);
  await expect(page.getByRole('button', { name: text.accept, exact: true })).toBeHidden();
});

test('sends none after Reject, and remembers the choice', async ({ page, context }) => {
  const trackers = watchTrackers(page);
  await page.goto(ROUTES.home);
  await page.getByRole('button', { name: text.reject, exact: true }).click();
  await page.reload();
  await loadAllImages(page);
  expect(trackers).toEqual([]);
  const cookies = await context.cookies();
  expect(cookies.find(({ name }) => name === CONSENT_COOKIE)?.value).toBe('v1.0.0');
  await expect(page.getByRole('button', { name: text.accept, exact: true })).toBeHidden();
});

test('gives Accept and Reject equal weight', async ({ page }) => {
  await page.goto(ROUTES.home);
  const accept = page.getByRole('button', { name: text.accept, exact: true });
  const reject = page.getByRole('button', { name: text.reject, exact: true });
  const [a, b] = await Promise.all([accept.boundingBox(), reject.boundingBox()]);
  expect(a?.width).toBe(b?.width);
  expect(a?.height).toBe(b?.height);
});

test('is a bottom sheet on phones', async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto(ROUTES.home);
  const panel = await page.getByRole('region', { name: text.title }).boundingBox();
  expect(panel?.x).toBe(0);
  expect(panel?.width).toBe(PHONE.width);
  expect((panel?.y ?? 0) + (panel?.height ?? 0)).toBe(PHONE.height);
});

test('reopens from Cookie preferences in the footer', async ({ page }) => {
  await page.goto(ROUTES.home);
  await page.getByRole('button', { name: text.reject, exact: true }).click();
  await page.locator('footer').getByRole('button', { name: text.reopen }).click();
  await expect(page.getByRole('button', { name: text.accept, exact: true })).toBeVisible();
});
