import { expect, test } from '@playwright/test';
import { API_PREFIX, ROUTES } from '@waren/shared';
import { dictionary } from '../src/lib/dictionary';
import { decideConsent, DESKTOP, loadAllImages, PHONE } from './helpers';

const HERO_CARD_TITLES = ['For Businesses', 'For Property & Families', 'For Kenyans Abroad'];
const RSC_PARAM = '_rsc=';
const TEST_WIDTHS = [360, 390, 430, 768, 1024, 1280, 1440, 1920];

test.beforeEach(async ({ context, baseURL }) => {
  await decideConsent(context, baseURL);
});

test.describe('content', () => {
  test.use({ viewport: DESKTOP });

  test('arrives complete in the first response', async ({ request }) => {
    const html = await (await request.get(ROUTES.home)).text();
    for (const title of HERO_CARD_TITLES) {
      expect(html).toContain(title.replace('&', '&amp;'));
    }
    expect(html).toContain('Meet Our Partners');
    expect(html).toContain('Latest from our advocates');
    expect(html).toContain('Need legal assistance? Speak to an advocate.');
  });

  test('never fetches page content from the browser', async ({ page }) => {
    const apiCalls: string[] = [];
    page.on('request', (call) => {
      if (call.url().includes(`/${API_PREFIX}/`)) apiCalls.push(call.url());
    });
    await page.goto(ROUTES.home);
    await loadAllImages(page);
    expect(apiCalls).toEqual([]);
  });

  test('fetches no other page until a link is chosen, also later in a visit', async ({
    context,
  }) => {
    const prefetches: string[] = [];
    context.on('request', (call) => {
      if (call.url().includes(RSC_PARAM)) prefetches.push(call.url());
    });
    for (let visit = 0; visit < 2; visit += 1) {
      const page = await context.newPage();
      await page.goto(ROUTES.home, { waitUntil: 'networkidle' });
      await loadAllImages(page);
      await page.close();
    }
    expect(prefetches).toEqual([]);
  });

  test('navigates by link later in a visit', async ({ context }) => {
    for (let visit = 0; visit < 2; visit += 1) {
      const page = await context.newPage();
      await page.goto(ROUTES.home);
      await page.locator('footer').getByRole('link', { name: dictionary.footer.aboutUs }).click();
      await expect(page).toHaveURL(ROUTES.about);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.close();
    }
  });

  test('has one H1, visually hidden, and three cards in the hero', async ({ page }) => {
    await page.goto(ROUTES.home);
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toHaveCount(1);
    await expect(heading).toHaveClass(/sr-only/);
    const hero = page.locator('main > section').first();
    await expect(hero.getByRole('link')).toHaveCount(HERO_CARD_TITLES.length);
    for (const title of HERO_CARD_TITLES) {
      await expect(hero.getByRole('link', { name: title })).toBeVisible();
    }
  });

  test('links 8 practice cards, in the design order, to pages that open', async ({
    page,
    request,
  }) => {
    await page.goto(ROUTES.home);
    const cards = page.locator('main > section').nth(2).getByRole('link');
    await expect(cards).toHaveCount(8);
    await expect(cards.first()).toContainText('01');
    await expect(cards.last()).toContainText('08');
    for (const href of await cards.evaluateAll((links) =>
      links.map((link) => link.getAttribute('href') ?? ''),
    )) {
      expect((await request.get(href)).status(), href).toBe(200);
    }
    await cards.first().click();
    await expect(page).not.toHaveURL(ROUTES.home);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('links 4 partners, with portraits, to their profiles', async ({ page }) => {
    await page.goto(ROUTES.home);
    const band = page.locator('main > section').nth(3);
    const cards = band.getByRole('link').filter({ has: page.locator('img') });
    await expect(cards).toHaveCount(4);
    await cards.first().click();
    await expect(page).toHaveURL(new RegExp(`${ROUTES.team}.+`));
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('links the 3 latest insights, each with a date', async ({ page }) => {
    await page.goto(ROUTES.home);
    const section = page.locator('main > section').nth(4);
    const cards = section.getByRole('link').filter({ has: page.getByRole('heading') });
    await expect(cards).toHaveCount(3);
    await expect(cards.first()).toContainText(/\d{4}/);
    const title = (await cards.first().getByRole('heading').textContent()) ?? '';
    await cards.first().click();
    await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
  });

  test('sends the CTA to Contact and WhatsApp as a plain link', async ({ page }) => {
    await page.goto(ROUTES.home);
    const cta = page.locator('main > section').last();
    await expect(cta.getByRole('link', { name: dictionary.cta.consultation })).toHaveAttribute(
      'href',
      ROUTES.contact,
    );
    await expect(cta.getByRole('link', { name: dictionary.cta.whatsApp })).toHaveAttribute(
      'href',
      /^https:\/\/wa\.me\//,
    );
  });
});

test.describe('layout', () => {
  for (const width of TEST_WIDTHS) {
    test(`has no horizontal scroll at ${width}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 800 });
      await page.goto(ROUTES.home);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }

  for (const viewport of [
    { width: 1366, height: 768 },
    { width: 1920, height: 1080 },
  ]) {
    test(`shows the full hero cards on the first screen at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(ROUTES.home);
      const hero = await page.locator('main > section').first().boundingBox();
      expect((hero?.y ?? 0) + (hero?.height ?? 0)).toBeLessThanOrEqual(viewport.height);
    });
  }

  test('keeps 64 px of image below the cards on desktop', async ({ page }) => {
    await page.setViewportSize(DESKTOP);
    await page.goto(ROUTES.home);
    const hero = page.locator('main > section').first();
    const box = await hero.boundingBox();
    const card = await hero.getByRole('link').first().boundingBox();
    expect((box?.y ?? 0) + (box?.height ?? 0) - (card?.y ?? 0) - (card?.height ?? 0)).toBe(64);
  });

  test('turns hero cards into compact rows on phones', async ({ page }) => {
    await page.setViewportSize(PHONE);
    await page.goto(ROUTES.home);
    const card = page.locator('main > section').first().getByRole('link').first();
    await expect(card.getByText(dictionary.home.heroCardButton)).toBeHidden();
    await expect(card.locator('p')).toBeHidden();
  });
});

test.describe('visual snapshots', () => {
  for (const viewport of [
    { width: 375, height: 812 },
    { width: 1440, height: 900 },
  ]) {
    test(`matches at ${viewport.width}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto(ROUTES.home);
      await loadAllImages(page);
      await expect(page).toHaveScreenshot(`home-${viewport.width}.png`, {
        fullPage: true,
        timeout: 30_000,
        mask: [page.locator('main > section').nth(4)],
      });
    });
  }
});
