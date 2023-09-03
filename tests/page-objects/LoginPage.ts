import * as dotenv from "dotenv"

dotenv.config()
import {expect, Page, Locator} from "@playwright/test";
import {LoginSelectors} from "../selectors/selectors";

const formData = {
    email: process.env.EMAIL ?? 'admin@example.com',
    password: process.env.PASSWORD ?? 'admin'
}

export class LoginPage {
    page: Page
    emailInput: Locator
    passwordInput: Locator
    loginButton: Locator

    constructor(page) {
        this.page = page
    }

    async initialize() {
        this.emailInput = await this.page.locator(LoginSelectors.email).first()
        this.passwordInput = await this.page.locator(LoginSelectors.password).first()
        this.loginButton = this.page.getByRole('button', {name: 'Log in'}).first()
    }

    goToLoginPage = async () => {
        await this.page.goto("/channel-pln/en-US/account/login/")
    }

    checkWelcomeText = async () => {
        await this.page.waitForSelector(LoginSelectors.welcomeBack);
        await this.page.waitForSelector(LoginSelectors.checkAccount);
    }

    checkIfForgotPasswordLinkIsPresent = async () => {
        await this.page.waitForSelector(LoginSelectors.forgotPassword);
    }

    checkRegisterLinkIsPresent = async () => {
        const registerLink = await this.page.waitForSelector(LoginSelectors.registerLink);
        if (!registerLink) {
            throw new Error('Register link element is not initialized.');
        }
        await registerLink.isVisible();
        const linkText = await registerLink.textContent();
        if (linkText !== 'Register a new account') {
            throw new Error(`Expected link text to be "Register a new account", but got "${linkText}"`);
        }
        const linkHref = await registerLink.getAttribute('href');
        const expectedHref = '/default-channel/en-US/account/register/';
        if (linkHref !== expectedHref) {
            throw new Error(`Expected link href to be "${expectedHref}", but got "${linkHref}"`);
        }
    }

    checkIfLoginButtonIsPresent = async () => {
        await this.loginButton.isVisible()
        const buttonText = await this.loginButton.textContent();
        if (buttonText !== 'Log in') {
            throw new Error(`Expected button text to be "Log in", but got "${buttonText}"`);
        }
        const buttonType = await this.loginButton.getAttribute('type');
        if (buttonType !== 'submit') {
            throw new Error(`Expected button type to be "submit", but got "${buttonType}"`);
        }
    }

    login = async (email: string = formData.email, password: string = formData.password) => {
        await this.emailInput.waitFor()
        await this.emailInput.fill(email)
        await this.passwordInput.waitFor()
        await this.passwordInput.fill(password)
        await this.loginButton.waitFor()
        await this.loginButton.click()
    }

    checkForInvalidCredentialsMessage = async () => {
        await this.emailInput.fill('invalid_admin@example.com')
        await this.passwordInput.fill('invalid')
        await this.loginButton.click()
        const invalidCredentialsMessage = await this.page.waitForSelector('text=Invalid credentials', {timeout: 2000});
        expect(invalidCredentialsMessage).toBeTruthy()
    }

}
