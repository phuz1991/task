import {Page} from "@playwright/test";
import {BasketSelectors} from "../selectors/selectors";


export class BasketPage {
    page: Page
    private basketCounter: number = 0

    constructor(page) {
        this.page = page
    }

    setBasketCount = async () => {
        try {
            const basketCounter = await this.page.waitForSelector(BasketSelectors.counter, {timeout: 1000})
            const text = await basketCounter.innerText()
            this.basketCounter = parseInt(text, 10)
        } catch (e) {
            this.basketCounter = 0;
        }
    }
    getBasketCount = async () => {
        await this.setBasketCount()
        return this.basketCounter
    }

    clickOnBasket = async () => {
        const basketIcon = await this.page.waitForSelector(BasketSelectors.basketIcon)
        await basketIcon.click()
    }
}




