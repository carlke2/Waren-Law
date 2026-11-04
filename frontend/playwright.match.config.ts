import { defineConfig } from '@playwright/test';

const BASE_URL = process.env.MATCH_BASE_URL ?? 'http://localhost:3000';

export default defineConfig({
  testDir: './e2e',
  testMatch: '*.match.ts',
  workers: 1,
  timeout: 600_000,
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    channel: 'chrome',
    contextOptions: { reducedMotion: 'reduce' },
  },
  webServer: {
    command: 'pnpm --dir .. start',
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
