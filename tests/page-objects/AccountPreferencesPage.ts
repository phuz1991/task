import {Page} from "@playwright/test";
import {AccountPreferencesSelectors, LayoutSelectors} from "../selectors/selectors";

export class AccountPreferencesPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    navigateToPreferences = async () => {
        const button = await this.page.waitForSelector(LayoutSelectors.myAccount)
        await button.click()
        await this.page.click(LayoutSelectors.accountPreferences);
    }

    isAccountPreferenceVisible = async () => {
        return this.page.$$(LayoutSelectors.accountPreferences);
    }

    checkAccountPreferencesLink = async () => {
        await this.page.getByTitle('Account preferences').isVisible()
    }

    checkAddressBookLink = async () => {
        await this.page.getByTitle('Address book').isVisible()
    }

    checkOrdersLink = async () => {
        await this.page.getByTitle('Orders').isVisible()
    }
    changeEmailFormIsVisible = async () => {
        const h2 = await this.page.getByTitle('Change email');
        await h2.isVisible()
        const email = await this.page.waitForSelector(AccountPreferencesSelectors.newEmail);
        await email.isVisible()
        const passwordInput = await this.page.waitForSelector(AccountPreferencesSelectors.password);
        await passwordInput.isVisible()
        const saveButton = this.page.getByRole('button', {name: 'Save'}).first()
        await saveButton.isVisible()
    }
    // rest are the same for Repeat new password
}
