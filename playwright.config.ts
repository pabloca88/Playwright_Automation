import { defineConfig, devices } from '@playwright/test';

/**
 * Load environment variables from .env (optional but recommended).
 * Make sure you have `dotenv` installed: npm install dotenv --save-dev
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const isCI = !!process.env.CI;

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Where Playwright looks for tests
  testDir: './tests',
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],

  // Global timeouts
  timeout: 30_000, // 30s per test
  expect: {
    timeout: 5_000, // 5s for expect() assertions
  },

  // Parallelism & retries
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : undefined,

  // Reporters for local + CI usage
  reporter: [
    ['list', { printSteps: true }],
    ['junit', { outputFile: 'test-results/junit-results.xml' }],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],

  // Shared settings for all tests
  use: {
    /**
     * Base URL for your AUT.
     * Prefer using environment variables so you can easily switch between
     * environments (DEV / QA / STAGE / PROD).
     */
    baseURL:
      process.env.BASE_URL ||
      'https://ecommerce-playground.lambdatest.io/index.php?',

    headless: isCI ? true : false,
    viewport: { width: 1366, height: 768 },
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    ignoreHTTPSErrors: true,

    // Artifacts
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Configure projects for different browsers / devices
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'google-chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  // Where Playwright stores traces, videos, screenshots, etc.
  outputDir: 'test-results',

  /**
   * If you run against a local dev server, configure it here.
   * Example:
   * webServer: {
   *   command: 'npm run start',
   *   url: process.env.BASE_URL || 'http://127.0.0.1:3000',
   *   reuseExistingServer: !isCI,
   *   timeout: 120_000,
   * },
   */
  // webServer: {
  //   command: 'npm run start',
  //   url: process.env.BASE_URL || 'http://127.0.0.1:3000',
  //   reuseExistingServer: !isCI,
  //   timeout: 120_000,
  // },
});
