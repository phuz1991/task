import { test, expect } from "@playwright/test";
import { BasketPage } from "./page-objects/Basket";
import { ProductPage } from "./page-objects/ProductPage";
import { CheckoutPage } from "./page-objects/CheckoutPage";

test.describe("Basket Scenarios", () => {
  test("Basket initially is empty when no items added into checkout", async ({
    page,
  }) => {
    const basketPage = new BasketPage(page);
    const basketCount = await basketPage.getBasketCount();
    expect(basketCount).toBe(0);
  });

  test("Should be able to add first option into basket and display it properly", async ({
    page,
  }) => {
    const basketPage = new BasketPage(page);
    const basketCount = await basketPage.getBasketCount();
    expect(basketCount).toBe(0);
    const productPage = new ProductPage(page);
    await productPage.navigateToExampleProduct();
    const chooseVariantTextAppear = await productPage.getChooseVariantElement();
    await chooseVariantTextAppear.isVisible();
    expect(chooseVariantTextAppear).toBeTruthy();
    const addToCardButtonBefore = await productPage.getAddToCartButton();
    const isDisabledBefore =
      await addToCardButtonBefore.getAttribute("disabled");
    expect(isDisabledBefore).toBe("");
    const optionsCount = await productPage.getProductRadioOptions();
    expect(optionsCount).toHaveLength(2);
    await productPage.chooseProductRadioOption(0);
    const chooseVariantStillAppear =
      await productPage.getChooseVariantElement();
    expect(chooseVariantStillAppear).toBe(null);
    const addToCartButton = await productPage.getAddToCartButton();
    const isDisabled = await addToCartButton.getAttribute("disabled");
    expect(isDisabled).toBe(null);
    await addToCartButton.click();
  });

  test("Should be able to navigate into checkout and fill details for summary", async ({
    page,
  }) => {
    await page.goto("/channel-pln/en-US/products/abba-abba-1970-1982/");
    const productPage = new ProductPage(page);
    await productPage.navigateToExampleProduct();
    await productPage.chooseProductRadioOption(0);
    const addToCartButton = await productPage.getAddToCartButton();
    await addToCartButton.click();
    const basketPage = new BasketPage(page);
    await basketPage.setBasketCount();
    const updatedBasketCount = await basketPage.getBasketCount();
    expect(updatedBasketCount).toBe(1);
    await basketPage.clickOnBasket();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.selectCountry("PL");
    await checkoutPage.fillTextInput("firstName", "Patryk");
    await checkoutPage.fillTextInput("lastName", "Doe");
    await checkoutPage.fillTextInput("companyName", "Example Company");
    await checkoutPage.fillTextInput("streetAddress1", "Street 11/11");
    await checkoutPage.fillTextInput("city", "Warsaw");
    await checkoutPage.fillTextInput("postalCode", "11-111");
    await checkoutPage.fillTextInput("phone", "500 500 500");
    await checkoutPage.fillCreditCardForm(
      "5252 5252 52525 52525",
      "12/25",
      "123",
    );
    const summaryText = await checkoutPage.getSummaryText();
    expect(summaryText).toBe("1970-1982");
    const quantity = await checkoutPage.getQuantity();
    expect(quantity).toBe(1);
  });
});
