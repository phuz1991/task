import { test, expect } from "@playwright/test";
import { LoginPage } from "./page-objects/LoginPage";

test.describe("Login scenarios", () => {
  test("Should display welcome text", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.checkWelcomeText();
  });

  test("Should display forgot password link", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.checkIfForgotPasswordLinkIsPresent();
  });

  test("Should display register link", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.checkRegisterLinkIsPresent();
  });

  test("Should display login button", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.checkIfLoginButtonIsPresent();
  });

  test("Should display an error for invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.checkForInvalidCredentialsMessage();
  });

  test("Successful login redirects to the correct page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.initialize();
    await loginPage.goToLoginPage();
    await loginPage.login();
    await page.waitForURL("https://demo.saleor.io/default-channel/en-US/", {
      timeout: 10000,
    });
    const currentUrl = page.url();
    expect(currentUrl).toBe("https://demo.saleor.io/default-channel/en-US/");
  });
});
