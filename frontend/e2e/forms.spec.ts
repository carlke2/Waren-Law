import { expect, test } from '@playwright/test';
import { API_PREFIX, API_ROUTES, ROUTES } from '@waren/shared';
import { dictionary } from '../src/lib/dictionary';
import { decideConsent, PHONE } from './helpers';

const text = dictionary.leadForm;
const ERROR = 'rgb(180, 35, 24)';

test.beforeEach(async ({ context, baseURL }) => {
  await decideConsent(context, baseURL);
});

test('contact form shows field errors and sends nothing when empty', async ({ page }) => {
  let calls = 0;
  await page.route(`**/${API_PREFIX}/${API_ROUTES.contact}/`, (route) => {
    calls += 1;
    return route.fulfill({ status: 200, json: { received: true } });
  });
  await page.goto(ROUTES.contact);
  await page.getByRole('button', { name: text.sendMessage }).click();
  const error = page.getByText(text.errors.name);
  await expect(error).toBeVisible();
  await expect(error).toHaveCSS('color', ERROR);
  expect(calls).toBe(0);
});

test('contact form sends the fields and where the visitor came from', async ({ page }) => {
  let body: Record<string, string> = {};
  await page.route(`**/${API_PREFIX}/${API_ROUTES.contact}/`, (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ status: 200, json: { received: true } });
  });
  await page.goto(`${ROUTES.contact}?utm_source=newsletter&utm_campaign=October`);
  await page.locator('main').getByLabel(text.labels.name).fill('Asha Otieno');
  await page.locator('main').getByLabel(text.labels.email).fill('asha@example.test');
  await page.locator('main').getByLabel(text.labels.country).selectOption('United Kingdom');
  await page.locator('main').getByLabel(text.labels.message).fill('I need advice on a property.');
  await page.getByRole('button', { name: text.sendMessage }).click();
  await expect(page.getByText(text.success)).toBeVisible();
  expect(body).toMatchObject({
    name: 'Asha Otieno',
    country: 'United Kingdom',
    page: ROUTES.contact,
    utmSource: 'newsletter',
    utmCampaign: 'October',
  });
});

test('consultation form explains a rate limit', async ({ page }) => {
  await page.route(`**/${API_PREFIX}/${API_ROUTES.consultation}/`, (route) =>
    route.fulfill({ status: 429, json: {} }),
  );
  await page.setViewportSize(PHONE);
  await page.goto(ROUTES.consultation);
  await page.locator('main').getByLabel(text.labels.name).fill('Asha Otieno');
  await page.locator('main').getByLabel(text.labels.email).fill('asha@example.test');
  await page.locator('main').getByLabel(text.labels.phone).fill('+254700000000');
  await page.locator('main').getByLabel(text.labels.country).selectOption('Kenya');
  await page.locator('main').getByLabel(text.labels.practiceArea).selectOption({ index: 1 });
  await page.locator('main').getByLabel(text.labels.clientType).selectOption('Business');
  await page.locator('main').getByLabel(text.labels.preferredMeeting).selectOption('Nairobi');
  await page.locator('main').getByLabel(text.labels.preferredDates).fill('Next week');
  await page.locator('main').getByLabel(text.labels.summary).fill('A shareholder dispute.');
  await page.getByRole('button', { name: dictionary.consultation.submit }).click();
  await expect(page.getByText(text.tooMany)).toBeVisible();
});

test('loads a map only after the visitor asks for it', async ({ page }) => {
  await page.goto(ROUTES.contact);
  await expect(page.locator('iframe')).toHaveCount(0);
  await page
    .getByRole('button', { name: /Show map/ })
    .first()
    .click();
  await expect(page.locator('iframe')).toHaveCount(1);
});

test('every Book a consultation link opens the consultation page', async ({ page }) => {
  await page.goto(ROUTES.home);
  await expect(page.getByRole('link', { name: dictionary.cta.consultation })).toHaveAttribute(
    'href',
    ROUTES.consultation,
  );
});
