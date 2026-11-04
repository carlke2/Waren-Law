import type { BrowserContext, Page } from '@playwright/test';
import { CONSENT_COOKIE } from '../src/lib/consent/consent';

export const DESKTOP = { width: 1440, height: 900 };
export const PHONE = { width: 390, height: 844 };
const REJECTED = 'v1.0.0';

export async function decideConsent(context: BrowserContext, baseURL: string | undefined) {
  await context.addCookies([{ name: CONSENT_COOKIE, value: REJECTED, url: baseURL ?? '' }]);
}

export async function loadAllImages(page: Page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 200));
  });
  await page.waitForLoadState('networkidle');
}
