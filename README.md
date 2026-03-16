# stagecraft

End-to-end testing framework using [Playwright](https://playwright.dev) with [Cucumber BDD](https://cucumber.io) and [ZeroStep AI](https://zerostep.com). Includes a demo React app as the test target.

## Tech Stack

- **Playwright** v1.44 — browser automation
- **Cucumber** — BDD test runner (`.feature` files → step definitions)
- **ZeroStep** — AI-powered natural language test steps
- **React 18** — demo frontend app being tested

## Structure

```
.
├── backend/
│   └── playwright-api/       # Playwright + Cucumber test suite
│       ├── tests/            # Playwright spec files
│       ├── features/         # Cucumber .feature files
│       └── step-definitions/ # Step implementations
└── frontend/
    └── playwright-front/     # React demo app (test target)
        └── src/
            ├── Login.js
            └── Logout.js
```

## Quick Start

### 1. Start the frontend

```bash
cd frontend/playwright-front
npm install
npm start
# App runs on http://localhost:3000
```

### 2. Run Playwright tests

```bash
cd backend/playwright-api
npm install
npx playwright test
```

### 3. Run Cucumber BDD tests

```bash
cd backend/playwright-api
npm test
```

## Features Demonstrated

- **Page Object Model** pattern with Playwright
- **BDD scenarios** written in Gherkin (Given/When/Then)
- **ZeroStep AI steps** — write tests in plain English, no selectors needed
- Covers: home page, sign-in flow, sign-out flow
