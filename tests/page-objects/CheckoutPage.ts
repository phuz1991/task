import {Page} from "@playwright/test";
import {CheckoutSelectors} from "../selectors/selectors";
export class CheckoutPage {
    page: Page
    constructor(page) {
        this.page = page
    }
    selectCountry = async (countryCode: string) => {
        await this.page.selectOption(CheckoutSelectors.countryCode, countryCode);
    }

    fillTextInput = async (fieldName: string, value: string) => {
        await this.page.fill(`input[name="${fieldName}"]`, value);
    }


    waitForIframeToLoad = async (iframeSelector: string) => {
        await this.page.waitForSelector(iframeSelector);
        const elementHandle = await this.page.$(iframeSelector);
        return await elementHandle.contentFrame();
    };
    fillCreditCardForm = async (cardNumber: string, expiryDate: string, cvc: string) => {
        let cardNumberFrame = await this.waitForIframeToLoad(CheckoutSelectors.cardNumberIframe);
        let expiryDateFrame = await this.waitForIframeToLoad(CheckoutSelectors.expiryDateIframe);
        let cvcFrame = await this.waitForIframeToLoad(CheckoutSelectors.cvcIframe);

        for (let i = 0; i < 3; i++) {
            try {
                await cardNumberFrame.fill(CheckoutSelectors.cardNumber, cardNumber);
                await expiryDateFrame.fill(CheckoutSelectors.expiryDate, expiryDate);
                await cvcFrame.fill(CheckoutSelectors.cvc, cvc);

                break;
            } catch (error) {
                console.error(`Attempt ${i + 1} failed with error: ${error}`);
                cardNumberFrame = await this.waitForIframeToLoad(CheckoutSelectors.cardNumberIframe);
                expiryDateFrame = await this.waitForIframeToLoad(CheckoutSelectors.expiryDateIframe);
                cvcFrame = await this.waitForIframeToLoad(CheckoutSelectors.cvcIframe);
            }
        }
    }

    getSummaryText = async () => {
        const text = await this.page.waitForSelector(CheckoutSelectors.summaryItemName);
        return text.innerText()
    }
    getQuantity = async () => {
        const text = await this.page.waitForSelector(CheckoutSelectors.quantity);
        return parseInt(await text.inputValue(), 10)
    }
}




