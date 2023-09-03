import {test, expect} from '@playwright/test';
import {SearchPage} from "./page-objects/SearchPage";

const testData = {
    query: "That's Me",
    artist: 'ABBA'
}

test.describe("User can search by query", () => {
    test("User should be navigated to search page", async ({page}) => {
        await page.goto("/")
        const searchPage = new SearchPage(page);
        await searchPage.clickOnSearch()

    });
    test("User can search against q=", async ({page}) => {
        await page.goto("/")
        const searchPage = new SearchPage(page);
        await searchPage.clickOnSearch()
        await searchPage.searchForQuery(testData.query)
        const queryParams = new URLSearchParams(page.url().split("?")[1]);
        const encodedQuery = queryParams.get("q");
        const decodedQuery = decodeURIComponent(encodedQuery);
        expect(decodedQuery).toEqual(testData.query)
        await page.waitForTimeout(3000)
        const elements = await searchPage.getSearchResultsElements()
        expect(elements.productNameText).toEqual(testData.query)
        expect(elements.artistNameText).toEqual(testData.artist)
    });
    test("User bring empty results for", async ({page}) => {
        await page.goto("/")
        const searchPage = new SearchPage(page);
        await searchPage.clickOnSearch()
        await searchPage.searchForQuery("invalid title")
        const queryParams = new URLSearchParams(page.url().split("?")[1]);
        const encodedQuery = queryParams.get("q");
        const decodedQuery = decodeURIComponent(encodedQuery);
        expect(decodedQuery).toEqual("invalid title")
        await page.waitForTimeout(3000)
        const elements = await searchPage.getSearchResultsElements()
        expect(elements.liElements).toHaveLength(0)
        await searchPage.checkIfEmptyResultsMessage()
    });
})
