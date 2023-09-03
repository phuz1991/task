export const ProductPageSelectors: Record<'variant' | 'addToCartButton' | 'radioGroup' | 'roleRadio', string> = {
    roleRadio: '[role="radiogroup"] [role="radio"]',
    radioGroup: '[role="radiogroup"]',
    addToCartButton: '[data-testid="addToCartButton"]',
    variant: 'p.text-base.text-yellow-600'
}

type LayoutKeys = 'myAccount' | 'accountPreferences' | 'searchIcon';
export const LayoutSelectors: Record<LayoutKeys, string> = {
    myAccount: 'button[aria-hidden="true"] svg',
    accountPreferences: 'a[href="/default-channel/en-US/account/preferences/"]',
    searchIcon: 'a[data-testid="searchIcon"]'
}

type LoginKeys = 'email' | 'password' | 'submit' | 'welcomeBack' |'checkAccount' | 'forgotPassword' | 'registerLink'  | 'logout'
export const LoginSelectors: Record<LoginKeys, string> = {
    registerLink: 'text=Register a new account',
    welcomeBack: 'text=Welcome back',
    forgotPassword: 'text=Forgot password?',
    checkAccount: 'text=Login to your account',
    email: 'input[name="email"]',
    password: 'input[name="password"]',
    submit: 'button[type="submit"]',
    logout: '.Navbar_user-menu button:text("Log out")'
}

type AccountPreferencesKeys = 'newEmail' | 'password';
export const AccountPreferencesSelectors: Record<AccountPreferencesKeys, string> = {
    newEmail: 'input[name="newEmail"]',
    password: 'input[name="password"]',
}

type SearchPageKeys = 'searchInput' | 'productsList' | 'noResults'
export const SearchPageSelectors: Record<SearchPageKeys, string> = {
    searchInput: 'input[data-testid="searchInput"]',
    productsList: 'ul[data-testid="productsList"] > li',
    noResults: 'p[data-testid="noResultsText"]',
}

type BasketKeys = 'counter' | 'basketIcon'
export const BasketSelectors: Record<BasketKeys, string> = {
    counter: 'span[data-testid="cartCounter"]',
    basketIcon: 'a[data-testid="cartIcon"]',
}

type CheckoutKeys = 'cardNumber' | 'expiryDate' | 'cvc' | 'shopper' | 'cardNumberIframe'  | 'expiryDateIframe' | 'cvcIframe' | 'countryCode' | 'summaryItemName' | 'quantity'


export const CheckoutSelectors: Record<CheckoutKeys, string> = {
    quantity: 'input[name="quantity"]',
    summaryItemName: 'p[aria-label="summary item name"]',
    countryCode: 'select[autocomplete="countryCode"]',
    shopper: 'iframe[src*="checkoutshopper-test.adyen.com"]',
    cardNumberIframe: "iframe[title='Iframe for secured card number']",
    expiryDateIframe: "iframe[title='Iframe for secured card expiry date']",
    cvcIframe: "iframe[title='Iframe for secured card security code']",
    cardNumber: 'input[data-fieldtype="encryptedCardNumber"]',
    expiryDate: 'input[data-fieldtype="encryptedExpiryDate"]',
    cvc: 'input[data-fieldtype="encryptedSecurityCode"]',
}




