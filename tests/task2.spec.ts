import test, { expect } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import dotenv from 'dotenv';
import { HomePage } from "./pages/homePage";
import { fileURLToPath } from "url";
import fs from 'fs';
import path from "path";
dotenv.config();

// Read api key from json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// store json file path
const apiKeyFilePath = path.join(__dirname, '../json-files/api_key.json');

test.describe('Login and get api key', () => {
    test('Verify user can get api key', async ({ page }) => {
        const moralisUrl = process.env.MORALIS_URL;
        await page.goto(`${moralisUrl}`);
        await expect(page).toHaveTitle('Moralis | The Ultimate Web3 Development Platform');
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
    
        await loginPage.fillUsername(`${email}`);
        await loginPage.fillPassword(`${password}`);
        await loginPage.clickLoginButton();
        await homePage.clickEyeIcon();
    
        const apiKey = await homePage.getApiKey();
        
        // store api key in json file
        fs.writeFileSync(apiKeyFilePath, JSON.stringify({ apiKey }));
    })
})

// Read api key from json file
const { apiKey } = JSON.parse(fs.readFileSync(apiKeyFilePath, 'utf8'));
test.describe('Execute getWalletNFTs', () => {
    test('Verify user can getWalletNFTs', async ({ request }) => {
        const url = process.env.GETWALLETNFTENDPOINT;
        const response = await request.get(`${url}`, {
            headers: {
                accept: 'application/json',
                'X-API-Key': apiKey
            },
            params: {
                chain: 'eth',
                format: 'decimal',
                media_items: 'false',
            },
        });
    
        expect(response.status()).toBe(200);
    });
})


