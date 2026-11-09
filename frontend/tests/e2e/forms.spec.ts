import { expect, test, type Page } from '@playwright/test';
import { API_PREFIX, API_ROUTES, ROUTES } from '@waren/shared';
import { dictionary } from '../../src/lib/utils/dictionary';
import { decideConsent, DESKTOP, PHONE } from './helpers';

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
  const links = page.getByRole('link', { name: dictionary.cta.consultation });
  const hrefs = await links.evaluateAll((items) => items.map((item) => item.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThan(0);
  expect(hrefs.every((href) => href === ROUTES.consultation)).toBe(true);
});

test('a recording webinar takes a request through the native form', async ({ page }) => {
  let body: Record<string, string> = {};
  await page.route(`**/${API_PREFIX}/${API_ROUTES.recordingRequests}/`, (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ status: 200, json: { received: true } });
  });
  await page.goto('/wealth-protection-plan-for-kenyans-abroad-webinar/');
  await page.locator('main').getByLabel(text.labels.name).fill('Asha Otieno');
  await page.locator('main').getByLabel(text.labels.email).fill('asha@example.test');
  await page.getByRole('button', { name: dictionary.webinars.requestRecording }).click();
  await expect(page.getByText(text.success)).toBeVisible();
  expect(body.page).toBe('/wealth-protection-plan-for-kenyans-abroad-webinar/');
});

const newsletter = dictionary.newsletter;
const NEWSLETTER = `**/${API_PREFIX}/${API_ROUTES.newsletter}/`;

function newsletterForm(page: Page) {
  const footer = page.locator('footer');
  return {
    email: footer.getByLabel(newsletter.email),
    submit: footer.getByRole('button', { name: newsletter.submit }),
    status: footer.getByRole('status'),
  };
}

test.describe('newsletter', () => {
  test.use({ viewport: DESKTOP });

  test('says how the address is used and links the Privacy Policy', async ({ page, request }) => {
    await page.goto(ROUTES.home);
    const footer = page.locator('footer');
    await expect(footer.getByText(newsletter.privacyNote)).toBeVisible();
    const link = footer.getByRole('link', { name: newsletter.privacyLink }).first();
    await expect(link).toHaveAttribute('href', ROUTES.privacy);
    expect((await request.get(ROUTES.privacy)).status()).toBe(200);
  });

  test('shows an error for a bad address and sends nothing', async ({ page }) => {
    let posted = false;
    await page.route(NEWSLETTER, (route) => {
      posted = true;
      return route.abort();
    });
    await page.goto(ROUTES.home);
    const { email, submit, status } = newsletterForm(page);
    await email.fill('nope');
    await submit.click();
    await expect(status).toHaveText(newsletter.invalid);
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(posted).toBe(false);
  });

  test('shows success and clears the field', async ({ page }) => {
    let body: unknown;
    await page.route(NEWSLETTER, (route) => {
      body = route.request().postDataJSON();
      return route.fulfill({ json: { received: true } });
    });
    await page.goto(ROUTES.home);
    const { email, submit, status } = newsletterForm(page);
    await email.fill('asha@example.test');
    await submit.click();
    await expect(status).toHaveText(newsletter.success);
    await expect(email).toHaveValue('');
    expect(body).toMatchObject({ email: 'asha@example.test' });
  });

  for (const [name, code, message] of [
    ['a rate limit', 429, newsletter.tooMany],
    ['a server error', 500, newsletter.failed],
  ] as const) {
    test(`explains ${name}`, async ({ page }) => {
      await page.route(NEWSLETTER, (route) => route.fulfill({ status: code, json: {} }));
      await page.goto(ROUTES.home);
      const { email, submit, status } = newsletterForm(page);
      await email.fill('asha@example.test');
      await submit.click();
      await expect(status).toHaveText(message);
    });
  }
});
