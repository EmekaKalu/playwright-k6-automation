import { Locator, Page, expect } from "@playwright/test";
import BasePage from "./basePage";

export class LoginPage extends BasePage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorText: Locator;
    readonly unauthorizedText: Locator;
    readonly forgotPasswordLink: Locator;
    readonly signupLink: Locator;
    readonly eyeIcon: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('//input[contains(@name,"email input")]');
        this.passwordInput = page.locator('//input[contains(@name,"password input")]');
        this.loginButton = page.locator('//button[contains(.,"Log in")]');
        this.unauthorizedText = page.locator('//h5[contains(.,"Something went wrong!")]');
        this.errorText = page.locator('//strong[@data-testid="test-input-feedback"]');
        this.eyeIcon = page.locator('//button[@data-testid="test-input-icon-visibility"]');
    }

    async fillUsername(username: string) {
        await this.fillElement(this.usernameInput, username);
    }

    async fillPassword(password: string) {
        await this.fillElement(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.clickElement(this.loginButton);
    }

    async pressEnterKey() {
        await this.hitEnterKey(this.loginButton);
    }

    async verifyErrorText() {
        await this.assertElementVisible(this.errorText);
    }

    async clickEyeIcon() {
        await this.clickElement(this.eyeIcon);
    }

    async verifyUnauthorizedText() {
        await this.assertElementVisible(this.unauthorizedText);
    }

    async login(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }
}