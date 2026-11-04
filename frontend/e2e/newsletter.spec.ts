import { expect, test, type Page } from '@playwright/test';
import { API_PREFIX, API_ROUTES, ROUTES } from '@waren/shared';
import { dictionary } from '../src/lib/dictionary';
import { decideConsent, DESKTOP } from './helpers';

const text = dictionary.newsletter;
const ENDPOINT = `**/${API_PREFIX}/${API_ROUTES.newsletter}/`;

test.use({ viewport: DESKTOP });

test.beforeEach(async ({ context, baseURL }) => {
  await decideConsent(context, baseURL);
});

function formIn(page: Page) {
  const footer = page.locator('footer');
  return {
    email: footer.getByLabel(text.email),
    submit: footer.getByRole('button', { name: text.submit }),
    status: footer.getByRole('status'),
  };
}

test('shows an error for a bad address and sends nothing', async ({ page }) => {
  let posted = false;
  await page.route(ENDPOINT, (route) => {
    posted = true;
    return route.abort();
  });
  await page.goto(ROUTES.home);
  const { email, submit, status } = formIn(page);
  await email.fill('nope');
  await submit.click();
  await expect(status).toHaveText(text.invalid);
  await expect(email).toHaveAttribute('aria-invalid', 'true');
  expect(posted).toBe(false);
});

test('shows success and clears the field', async ({ page }) => {
  let body: unknown;
  await page.route(ENDPOINT, (route) => {
    body = route.request().postDataJSON();
    return route.fulfill({ json: { received: true } });
  });
  await page.goto(ROUTES.home);
  const { email, submit, status } = formIn(page);
  await email.fill('asha@example.test');
  await submit.click();
  await expect(status).toHaveText(text.success);
  await expect(email).toHaveValue('');
  expect(body).toMatchObject({ email: 'asha@example.test' });
});

for (const [name, code, message] of [
  ['a rate limit', 429, text.tooMany],
  ['a server error', 500, text.failed],
] as const) {
  test(`explains ${name}`, async ({ page }) => {
    await page.route(ENDPOINT, (route) => route.fulfill({ status: code, json: {} }));
    await page.goto(ROUTES.home);
    const { email, submit, status } = formIn(page);
    await email.fill('asha@example.test');
    await submit.click();
    await expect(status).toHaveText(message);
  });
}
