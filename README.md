<h1 align="center">🚀 Playwright Automation Framework</h1>

<p align="center">
  <a href="https://github.com/pabloca88/Playwright_Automation/actions/workflows/playwright-ci.yml">
    <img src="https://github.com/pabloca88/Playwright_Automation/actions/workflows/playwright-ci.yml/badge.svg" alt="Playwright CI">
  </a>
</p>

<p align="center">
  End‑to‑end UI & API testing framework built with <strong>Playwright + TypeScript</strong>, following industry‑level structure and CI/CD best practices.
</p>

---

## 🌟 Features

- ✔️ **Cross-browser testing** (Chromium, Firefox, WebKit, Chrome)
- ✔️ **Modern Page Object Model (POM)** structure
- ✔️ **Showcase-ready clean test specs**
- ✔️ **API testing** with retry & assertions
- ✔️ **GitHub Actions CI/CD** (caching + artifacts + reporting)
- ✔️ **HTML & JUnit reports**
- ✔️ **Environment variable support via `.env`**
- ✔️ **Reusable fixtures & session management** (ready for expansion)

---

## 📦 Prerequisites

- **Node.js 18+**
- npm or yarn
- Optional: `.env` file for environments

---

## ⚙️ Installation

```bash
npm install
npx playwright install --with-deps
```

---

## 🧪 Running Tests

```bash
# Run all tests
npx playwright test

# Headed mode (debugging/local)
npx playwright test --headed

# Target browser
npx playwright test --project=chromium

# Open Playwright UI mode
npx playwright test --ui

# Run a single test file
npx playwright test tests/addToCart.spec.ts
```

---

## 🏗️ Project Structure

```
tests/
├── addToCart.spec.ts       # E2E cart flow
├── API.spec.ts             # REST API testing
└── challenge.spec.ts       # UI interactions

pages/
├── homePage.ts
├── loginPage.ts
├── registerPage.ts
└── specialHotPage.ts

fixtures/
└── (ready for session/auth fixtures)

playwright.config.ts        # Strengthened configuration
```

---

## 🔧 Configuration

Use a `.env` file at the project root:

```env
BASE_URL=https://ecommerce-playground.lambdatest.io/index.php?
REQRES_API_KEY=your-api-key-here
```

All test configuration (browsers, retries, traces, reports, CI settings) is defined in:

```
playwright.config.ts
```

---

## 🤖 CI/CD with GitHub Actions

This repository includes a full CI pipeline:

- Runs on **push** & **pull_request** to `main`
- Installs dependencies with **node_modules caching** for speed
- Runs tests in **headless mode**
- Uploads **HTML report & traces** as downloadable artifacts

View the pipeline →  
https://github.com/pabloca88/Playwright_Automation/actions

---

## 📊 Reports

Generate and open the Playwright HTML report:

```bash
npx playwright show-report
```

Reports are also uploaded to GitHub Actions on every CI run.

---

## ⭐ Why This Repo Is Portfolio-Ready

- Clean folder organization  
- Realistic POM structure  
- Strong TypeScript config  
- CI pipeline included  
- Maintains readability with `test.step()`  
- Uses good automation patterns (uniqueness in test data, waits, assertions)

---

## 📄 License

ISC

---

If you enjoy this project, consider starring ⭐ the repository!
