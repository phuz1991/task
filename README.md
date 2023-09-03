# My Playwright Test Automation Project

![Playwright Logo](https://playwright.dev/img/playwright-logo.svg)

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Getting Started](#getting-started)
3. [Running Tests](#running-tests)
4. [Environment Variables](#environment-variables)

## Prerequisites

### Software Requirements

- Node.js: We recommend using Node.js version 18 for optimal compatibility.

  ```bash
  nvm install 18
  nvm use 18
  ```

- Yarn or npm: This project uses Yarn or npm as a package manager.

### System Requirements

- Operating System: macOS, Linux, or Windows
- Browser: Google Chrome, Firefox, or Safari

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/phuz1991/task.git
cd saleor-playwright
```

## Install dependencies

```bash
npm install
```

or using yarn

```bash
yarn install
```

## Running Tests

### Command Line Mode

Execute the following command to run all tests:

```bash
npm test
```

Or if you are using Yarn:

```bash
yarn test
```

### UI Mode

From recent version of Playwright, you can run your tests using a graphical user interface which makes it easier to debug and inspect your tests during development.

To start the test runner in UI mode, execute the following command:

```bash
npm ui
```

### Run Specific Tests

To run a specific test or test suite, you can specify the file name:

```bash
npx playwright test tests/specific-test.spec.ts
```

## Environment Variables

Create a .env file in the root directory of the project and add the necessary key-value pairs. For example:

```bash
EMAIL=admin@example.com
PASSWWORD=admin
```

## Test Report

After running the test, the report will be generated in the folder: `./playwright-report`

## CI/CD

This project is integrated with Github Actions. You can check the test results at: https://github.com/phuz1991/task/actions

## Test Cases

You can find the test cases in the folder: `./tests`

This project includes various test scenarios to ensure the functionality of the application. Here is a brief description of what each test case does:

1. **Basket**: Validates the basket functionality.
2. **Checkout**: Validates the checkout functionality, including the shipping and payment methods.
3. **Search** for a products and functionalities related to it.
4. **Login** user is able to login to the application for existing user and wrong credentials.
