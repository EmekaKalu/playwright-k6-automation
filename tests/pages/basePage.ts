import { Locator, Page, expect } from "@playwright/test";

// This base page class will be inherited by all pages to use common methods
// Common methods are methods that can be used across all pages to complete common tasks
export default class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Common method to navigate to any url
    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    // Common method to close browser
    async closeBrowser() {
        await this.page.close();
    }

    // Common method to click an element
    async clickElement(element: Locator) {
        await element.click();
    }

    // Common method to fill text field
    async fillElement(element: Locator, text: string) {
        await element.fill(text);
    }

    // Common method to get text from an element
    async getElementText(element: Locator): Promise<string> {
        return element.innerText();
    }

    // Common method to wait for an element to be visible
    async waitForElementVisible(selector: string) {
        await this.page.waitForSelector(selector, { state: 'visible' });
    }

    // Common method to assert element is visible
    async assertElementVisible(element: Locator) {
        await expect(element).toBeVisible();
    }

    // Common method to wait for an element to be hidden
    async waitForElementHidden(selector: string) {
        await this.page.waitForSelector(selector, { state: 'hidden' });
    }

    // Common method to assert text matches an element
    async assertElementText(element: Locator, text: string) {
        await expect(element).toContainText(text);
    }

    // Common method to hit enter key
    async hitEnterKey(element: Locator) {
        await element.press('Enter');
    }

    // Common method to select an option from a dropdown
    async selectDropdownValue(element: Locator, value: string) {
        await element.selectOption(value);
    }

    // Common method to assert button is disabled
    async assertButtonDisabled(element: Locator) {
        await expect(element).toBeDisabled();
    }

    // Common method to assert button is enabled
    async assertButtonEnabled(element: Locator) {
        await expect(element).toBeEnabled();
    }

    // Common method to get value from an element
    async storeValue(element: Locator) {
        return await element.inputValue();
    }

}