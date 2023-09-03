import {test, expect} from '@playwright/test';
import {LoginPage} from "./page-objects/LoginPage";
import {AccountPreferencesPage} from "./page-objects/AccountPreferencesPage";


test.describe("Account Preferences", () => {
    test("Should be able navigate to account preferences when logged in", async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.initialize();
        await loginPage.goToLoginPage()
        await loginPage.login();
        await page.waitForURL('/default-channel/en-US/', { timeout: 20000 });
        const accountPreferences = new AccountPreferencesPage(page)
        await accountPreferences.navigateToPreferences()
        await accountPreferences.checkAccountPreferencesLink()
        await accountPreferences.checkAddressBookLink()
        await accountPreferences.checkOrdersLink()
        await accountPreferences.changeEmailFormIsVisible()
        // rest are the same for Repeat new password
    });
    test("Should not see account preference icon when not logged in", async ({page}) => {
        const accountPreferences = new AccountPreferencesPage(page)
        expect(await accountPreferences.isAccountPreferenceVisible()).toHaveLength(0);
    });
})



