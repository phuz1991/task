import { expect, Page } from "@playwright/test";
import { LayoutSelectors, SearchPageSelectors } from "../selectors/selectors";

export class SearchPage {
  page: Page;

  constructor(page) {
    this.page = page;
  }

  clickOnSearch = async () => {
    const searchIcon = await this.page.waitForSelector(
      LayoutSelectors.searchIcon,
    );
    await searchIcon.isVisible();
    await searchIcon.click();
    await expect(this.page).toHaveTitle(/Saleor React Storefront/);
  };
  searchForQuery = async (q: string) => {
    const searchInput = await this.page.waitForSelector(
      SearchPageSelectors.searchInput,
    );
    await searchInput.isVisible();
    await searchInput.focus();
    await searchInput.fill(q);
    // here we can make that's imitate keyboard typing
    // await this.page.keyboard.type(q, { delay: 200 })
  };

  getSearchResultsElements = async () => {
    const liElements = await this.page.$$(SearchPageSelectors.productsList);
    if (!liElements.length) {
      return {
        liElements: [],
      };
    }
    const pElements = await liElements[0].$$("p");

    const productNameElement = pElements[0]; // name is first <p>
    const artistNameElement = pElements[1]; // artistName is second <p>

    const productNameText = await productNameElement.innerText();
    const artistNameText = await artistNameElement.innerText();

    return {
      liElements,
      productNameElement,
      artistNameElement,
      productNameText,
      artistNameText,
    };
  };

  checkIfEmptyResultsMessage = async () => {
    const invalidCredentialsMessage = await this.page.waitForSelector(
      SearchPageSelectors.noResults,
      { timeout: 2000 },
    );
    expect(invalidCredentialsMessage).toBeTruthy();
  };
}
