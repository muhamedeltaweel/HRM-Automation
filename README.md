# HRM Automation

[![Playwright Tests](https://github.com/muhamedeltaweel/HRM-Automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/muhamedeltaweel/HRM-Automation/actions/workflows/playwright.yml)

End-to-end UI and API test automation with [Playwright](https://playwright.dev) and TypeScript.

- **UI:** the Add Employee flow of the [OrangeHRM demo](https://opensource-demo.orangehrmlive.com/)
- **API:** the users endpoints of [reqres.in](https://reqres.in)

## Tech stack

- Playwright Test (`@playwright/test`) with TypeScript
- Page Object Model, with a `PomManager` and custom fixtures
- Data-driven tests with typed test data
- GitHub Actions for CI

## Project structure

```
.
├── .github/workflows/playwright.yml    # CI: runs all tests on push / PR to main
├── playwright.config.ts                # Chromium, OrangeHRM baseURL, retries on CI
├── testData/ui/
│   ├── userCredentials.ts              # OrangeHRM demo login
│   ├── validEmployeeData.ts            # data for the successful add
│   └── inValidEmployeeData.ts          # negative cases, one test per entry
└── tests/
    ├── ui/
    │   ├── pages/                      # LoginPage, HomePage, EmployeePage, PomManager
    │   ├── fixtures/employee.ts        # pomManager and employeePage fixtures
    │   └── specs/addEmployee.spec.ts
    └── apis/
        ├── endpoints/usersEndPoints.ts # reqres.in request helpers
        └── specs/usersApi.spec.ts
```

## Test coverage

### UI: Add Employee (OrangeHRM)

Each test opens the login page, signs in as Admin, and goes to **PIM → Add Employee**.

| Test | What it checks |
|---|---|
| Valid add employee | Fills the form, including login details, saves, and expects the success message. The Employee Id and username get a new suffix on every run. |
| Invalid add employee: Username already exists | Uses the existing `Admin` username and expects the field error. |
| Invalid add employee: Passwords do not match | Uses a different confirm password and expects the field error. |

### API: Users (reqres.in)

| Test | Request | Expected |
|---|---|---|
| Get all users | `GET /api/users/` | `200` |
| Get specific user | `GET /api/users/3` | `200`, `data.id` is `3` |
| Get page with query param | `GET /api/users/?page=2` | `200`, `page` is `2` |
| Create user | `POST /api/users/` | `201`, `job` is `tester` |

## Getting started

You need Node.js (LTS) and npm.

```bash
npm ci
npx playwright install --with-deps chromium
```

## Running the tests

```bash
npx playwright test               # all tests
npx playwright test tests/ui      # UI tests only
npx playwright test tests/apis    # API tests only
npx playwright test --headed      # watch the browser
npx playwright show-report        # open the last HTML report
```

## Adding a negative case

Add an entry to `testData/ui/inValidEmployeeData.ts`. A new test is generated for it automatically. `testType` is used in the test title and is also the error text the test expects to see on the form.

```ts
{
    "frst_name": "First",
    "md_name": "of",
    "lst_name": "his name",
    "employee_tb": "T-0003",
    "user_name": "someuser",
    "ps": "Password1##",
    "conf_ps": "Password1##",
    "testType": "<error message shown on the form>"
}
```

The file is checked against the `EmployeeData` type, so a missing or misspelled field is reported before the tests run.

## CI

GitHub Actions runs the whole suite on every push and pull request to `main`. On CI, a failing test is retried up to 2 times, and the HTML report is uploaded as the `playwright-report` artifact for 30 days.

## Notes

- Both targets are public, shared demo environments. The OrangeHRM demo is reset from time to time, and reqres.in limits requests made without an API key, so a failure can come from the environment rather than the tests.
- The credentials in `testData/ui/userCredentials.ts` are the public OrangeHRM demo credentials.
- The valid test uses a two-digit suffix for the Employee Id and username. If it fails with "already exists", run it again.
