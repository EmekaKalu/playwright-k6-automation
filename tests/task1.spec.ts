import {test, expect } from "@playwright/test";
import { LoginPage } from "../tests/pages/loginPage";
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from "url";
import path from "path";
import { HomePage } from "./pages/homePage";
import { NodesPage } from "./pages/nodesPage";
dotenv.config();

// Read api key from json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// store json file path
const nodeKeyFilePath = path.join(__dirname, '../json-files/node_key.json');

test.describe('Login Scenarios and get node key', () => {

    // Before each test go to moralis login page
    test.beforeEach(async ({ page }) => {
        const moralisUrl = process.env.MORALIS_URL;
        await page.goto(`${moralisUrl}`);
        await expect(page).toHaveTitle('Moralis | The Ultimate Web3 Development Platform');
    })
    
    test('Verify user can not login when email is blank', async ({ page }) => {
        const loginPage = new LoginPage(page);
    
        await loginPage.fillUsername('');
        await loginPage.fillPassword('test');
        await loginPage.pressEnterKey();
        await loginPage.verifyErrorText();
    })
    
    test('Verify user can not login when password is blank', async ({ page }) => {
        const loginPage = new LoginPage(page);
    
        await loginPage.fillUsername('test@test');
        await loginPage.fillPassword('');
        await loginPage.clickEyeIcon();
        await loginPage.verifyErrorText();
    })

    test('Verify user can not login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.fillUsername('test@test');
        await loginPage.fillPassword('test');
        await loginPage.clickLoginButton();
        await loginPage.verifyUnauthorizedText();
    })

    test('Verify user can log in with valid credentials', async ({ page }) => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const loginPage = new LoginPage(page);

        await loginPage.fillUsername(`${email}`);
        await loginPage.fillPassword(`${password}`);
        await loginPage.clickLoginButton();
    })
    
    test('Verify user can not create node if user has not selected a protocol or network', async ({ page }) => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const nodesPage = new NodesPage(page);

        await loginPage.login(`${email}`, `${password}`);
        await homePage.gotoNodesPage();
        await nodesPage.clickCreateANodeButton();
        await nodesPage.verifyCreateNodeDisabled();
    })

    test('Verify user can create node', async ({ page }) => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        const nodesPage = new NodesPage(page);

        await loginPage.login(`${email}`, `${password}`);
        await homePage.gotoNodesPage();
        await nodesPage.clickCreateANodeButton();
        await nodesPage.selectProtocol('Ethereum');
        await nodesPage.selectNetwork('Mainnet');
        await nodesPage.clickCreateNodeButton();
        const nodeKey = await nodesPage.getNodeSite();

        // Write node key to json file
        fs.writeFileSync(nodeKeyFilePath, JSON.stringify({ nodeKey }));
    })
})

const { nodeKey } = JSON.parse(fs.readFileSync(nodeKeyFilePath, 'utf8'));
const url = nodeKey;
test.describe('Execute RPC methods', () => {
    test('Verify user can use node key to execute RPC blockNumber method', async ({ request }) => {
        
        // request body
        var body = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_blockNumber",
        }
        const response = await request.post(url, {
            data:body
        });
    
        console.log(response);

        // verify the response status
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        console.log(response.json());

        // verify the response body contains a result property
        expect(responseBody).toHaveProperty('result');
    });
    
    test('Verify user can use node key to execute RPC getBlockByNumber method', async ({ request }) => {
        
        // request body
        var body = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_getBlockByNumber",
            "params": ["latest", true]
        }

        // make request
        const response = await request.post(url, {
            data:body
        });
        
        // verify the response status
        expect(response.status()).toBe(200);

        // verify the response body contains a result property
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('result');
    });

    test('Verify user can use node key to execute RPC getTransactionByHash method', async ({ request }) => {
        // request body
        var body = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "eth_getTransactionByHash",
            "params": ["0x46ef988a5da9627f3a877f8e6adf065f9673a638c8c7e4e53ac787b4ecc01803"]
        }

        // make request
        const response = await request.post(url, {
            data:body
        });
        
        // verify the response status
        expect(response.status()).toBe(200);

        // verify the response body contains a result property
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty('result');
        console.log(responseBody);
    });
})