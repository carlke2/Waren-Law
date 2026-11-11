import { expect, test } from '@playwright/test';
import { ROUTES } from '@waren/shared';
import { dictionary } from '../../src/lib/utils/dictionary';
import { PANEL_NAV } from '../../src/lib/utils/navigation';
import { decideConsent, DESKTOP, PHONE } from './helpers';

const { nav } = dictionary;

test.beforeEach(async ({ context, baseURL }) => {
  await decideConsent(context, baseURL);
});

test.describe('desktop header', () => {
  test.use({ viewport: DESKTOP });

  test('shows the panel menu without booking or email', async ({ page }) => {
    await page.goto(ROUTES.home);
    const header = page.locator('header');
    const main = header.getByRole('navigation', { name: nav.primary });
    for (const { label } of PANEL_NAV) {
      await expect(main.getByRole('button', { name: label, exact: true })).toBeVisible();
    }
    await expect(header.getByRole('link', { name: dictionary.cta.consultation })).toHaveCount(0);
    await expect(header.getByRole('link', { name: /info@warenlaw\.com/i })).toHaveCount(0);
    await expect(header.getByRole('link', { name: nav.search })).toBeVisible();
    await expect(page.getByRole('button', { name: nav.openMenu })).toBeHidden();
  });

  test('opens a panel from the keyboard and closes with Escape', async ({ page }) => {
    await page.goto(ROUTES.home);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: dictionary.common.skipToContent })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: dictionary.brand.wordmark, exact: true }),
    ).toBeFocused();
    const about = page.locator('header').getByRole('button', { name: nav.aboutUs, exact: true });
    await about.focus();
    await page.keyboard.press('Enter');
    await expect(about).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('heading', { name: nav.aboutUs, exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(about).toHaveAttribute('aria-expanded', 'false');
    await expect(about).toBeFocused();
  });

  test('swaps panels without closing the shell', async ({ page }) => {
    await page.goto(ROUTES.home);
    const header = page.locator('header');
    await header.getByRole('button', { name: nav.aboutUs, exact: true }).click();
    await expect(page.getByRole('heading', { name: nav.aboutUs, exact: true })).toBeVisible();
    await header.getByRole('button', { name: nav.ourTeam, exact: true }).click();
    await expect(page.getByRole('heading', { name: nav.ourTeam, exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: nav.aboutUs, exact: true })).toHaveCount(0);
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: PHONE });

  test('opens, expands a section and closes by keyboard', async ({ page }) => {
    await page.goto(ROUTES.home);
    const open = page.getByRole('button', { name: nav.openMenu });
    await open.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: nav.closeMenu })).toBeFocused();
    const box = await dialog.boundingBox();
    expect(box).toMatchObject({ x: 0, y: 0, width: PHONE.width, height: PHONE.height });
    await dialog.getByRole('button', { name: nav.ourTeam, exact: true }).click();
    await expect(dialog.getByRole('link', { name: nav.seeAllTeam, exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });

  test('closes and navigates when a link is chosen', async ({ page }) => {
    await page.goto(ROUTES.home);
    await page.getByRole('button', { name: nav.openMenu }).click();
    const dialog = page.getByRole('dialog');
    await dialog.getByRole('button', { name: nav.ourTeam, exact: true }).click();
    await dialog.getByRole('link', { name: nav.seeAllTeam, exact: true }).click();
    await expect(page).toHaveURL(ROUTES.team);
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('has a 44 px menu button', async ({ page }) => {
    await page.goto(ROUTES.home);
    const box = await page.getByRole('button', { name: nav.openMenu }).boundingBox();
    expect(box?.width).toBe(44);
    expect(box?.height).toBe(44);
  });
});
