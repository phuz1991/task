import {ElementHandle, Page} from "@playwright/test";
import {ProductPageSelectors} from "../selectors/selectors";


export class ProductPage {
    page: Page

    constructor(page) {
        this.page = page
    }

    getProductRadioOptions = async () => {
        await this.page.waitForSelector(ProductPageSelectors.radioGroup);
        return await this.page.$$(ProductPageSelectors.roleRadio);
    }

    navigateToExampleProduct = async () => {
        await this.page.goto('/channel-pln/en-US/products/abba-abba-1970-1982/')
    }

    chooseProductRadioOption = async (optionIndex: 0 | 1) => {
        const options = await this.getProductRadioOptions();
        await options[optionIndex].focus()
        await options[optionIndex].click()
    }

    getChooseVariantElement = async (): Promise<null | ElementHandle<HTMLElement>> => {
        try {
            const el = await this.page.waitForSelector(ProductPageSelectors.variant, {timeout: 1000});
            return el as ElementHandle<HTMLElement>
        } catch (e) {
            return null
        }
    }

    getAddToCartButton = async (): Promise<ElementHandle<HTMLElement>> => {
        const button = await this.page.waitForSelector(ProductPageSelectors.addToCartButton);
        return button as ElementHandle<HTMLElement>
    }
}




