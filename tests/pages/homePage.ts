import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class HomePage extends BasePage {
    readonly page: Page;
    readonly nodesButton: Locator;
    readonly homeButton: Locator;
    readonly apiKey: Locator;
    readonly eyeIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.nodesButton = page.locator('//button[contains(@title,"Nodes")]');
        this.homeButton = page.locator('//button[contains(@title,"Home")]');
        this.apiKey = page.locator('//input[contains(@data-testid,"mui-input")]');
        this.eyeIcon = page.locator('//button[@aria-label="Hide"]');
    }

    async gotoNodesPage() {
        await this.clickElement(this.nodesButton);
    }

    async gotoHomePage() {
        await this.clickElement(this.homeButton);
    }

    async getApiKey() {
        return this.storeValue(this.apiKey);
    }

    async clickEyeIcon() {
        await this.clickElement(this.eyeIcon);
    }

}