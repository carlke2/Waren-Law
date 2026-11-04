import { defineConfig } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  workers: 2,
  timeout: 60_000,
  reporter: 'list',
  snapshotPathTemplate: '{testDir}/snapshots/{arg}{ext}',
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0.01, animations: 'disabled' },
  },
  use: { baseURL: BASE_URL, channel: 'chrome' },
  webServer: {
    command: 'pnpm --dir .. start',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
