import { expect, test } from '@playwright/test';
import { ROUTES } from '@waren/shared';
import { dictionary } from '../src/lib/dictionary';
import { CONTACT_LINK, PRIMARY_NAV } from '../src/lib/navigation';
import { decideConsent, DESKTOP, PHONE } from './helpers';

const { nav } = dictionary;

test.beforeEach(async ({ context, baseURL }) => {
  await decideConsent(context, baseURL);
});

test.describe('desktop header', () => {
  test.use({ viewport: DESKTOP });

  test('shows the full nav and turns solid on scroll', async ({ page }) => {
    await page.goto(ROUTES.home);
    const header = page.locator('header');
    const main = header.getByRole('navigation', { name: nav.primary }).first();
    for (const { label, href } of [...PRIMARY_NAV, CONTACT_LINK]) {
      await expect(main.getByRole('link', { name: label, exact: true })).toHaveAttribute(
        'href',
        href,
      );
    }
    await expect(page.getByRole('button', { name: nav.openMenu })).toBeHidden();
    await expect(header).toHaveAttribute('data-solid', 'false');
    await page.mouse.wheel(0, 600);
    await expect(header).toHaveAttribute('data-solid', 'true');
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute('data-solid', 'false');
  });

  test('sits over the page hero on an inner page, with its section in gold', async ({ page }) => {
    await page.goto(ROUTES.partners);
    await expect(page.locator('header')).toHaveAttribute('data-solid', 'false');
    await expect(page.locator('header').getByRole('link', { name: nav.partners })).toHaveAttribute(
      'aria-current',
      'page',
    );
    await expect(page.locator('h1')).toHaveCount(1);
  });

  test('can be used by keyboard, starting with the skip link', async ({ page }) => {
    await page.goto(ROUTES.home);
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: dictionary.common.skipToContent })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(
      page.getByRole('link', { name: dictionary.brand.wordmark, exact: true }),
    ).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.locator('header nav a').first()).toBeFocused();
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: PHONE });

  test('opens, traps focus and closes by keyboard', async ({ page }) => {
    await page.goto(ROUTES.home);
    const open = page.getByRole('button', { name: nav.openMenu });
    await open.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: nav.closeMenu })).toBeFocused();
    const box = await dialog.boundingBox();
    expect(box).toMatchObject({ x: 0, y: 0, width: PHONE.width, height: PHONE.height });
    for (const { label } of [...PRIMARY_NAV, CONTACT_LINK]) {
      await page.keyboard.press('Tab');
      await expect(dialog.getByRole('link', { name: label, exact: true })).toBeFocused();
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(open).toBeFocused();
  });

  test('closes and navigates when a link is chosen', async ({ page }) => {
    await page.goto(ROUTES.home);
    await page.getByRole('button', { name: nav.openMenu }).click();
    await page.getByRole('dialog').getByRole('link', { name: nav.people, exact: true }).click();
    await expect(page).toHaveURL(ROUTES.team);
    await expect(page.getByRole('dialog')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1, name: nav.people })).toBeVisible();
  });

  test('has a 44 px menu button', async ({ page }) => {
    await page.goto(ROUTES.home);
    const box = await page.getByRole('button', { name: nav.openMenu }).boundingBox();
    expect(box?.width).toBe(44);
    expect(box?.height).toBe(44);
  });
});
