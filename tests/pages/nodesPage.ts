import { Locator, Page } from "@playwright/test";
import BasePage from "./basePage";

export class NodesPage extends BasePage {
    readonly page: Page;
    readonly createANodeButton: Locator;
    readonly createNodeButton: Locator;
    readonly selectProtocolDropdown: Locator;
    readonly selectNetworkDropdown: Locator;
    readonly nodeInformation: Locator;
    readonly nodeSite: Locator;

    constructor(page: Page) {
        super(page);
        this.createANodeButton = page.locator('//button[contains(.,"Create a New Node")]');
        this.selectProtocolDropdown = page.locator('//select[@name="select-protoccol"]');
        this.selectNetworkDropdown = page.locator('//select[@name="select-network"]');
        this.nodeInformation = page.locator('//h4[contains(.,"Node information")]');
        this.createNodeButton = page.locator('//button[contains(.,"Create Node")]');
        this.nodeSite = page.locator('(//input[@data-testid="mui-input"])[1]');
    }
    async clickCreateANodeButton() {
        await this.clickElement(this.createANodeButton);
    }

    async verifyCreateNodeDisabled() {
        await this.assertButtonDisabled(this.createNodeButton);
    }

    async clickCreateNodeButton() {
        await this.clickElement(this.createNodeButton);
    }

    async selectProtocol(protocol: string) {
        await this.selectDropdownValue(this.selectProtocolDropdown, protocol);
    }

    async selectNetwork(network: string) {
        await this.selectDropdownValue(this.selectNetworkDropdown, network);
    }

    async getNodeSite() {
        return this.storeValue(this.nodeSite);
    }

}