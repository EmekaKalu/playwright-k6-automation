# playwright-k6-automation

## Overview

This repository showcases an automation project leveraging both [Playwright](https://playwright.dev/) and [k6](https://k6.io/docs/) for streamlined testing. The project demonstrates:
- **Comprehensive Automation:** Execute both frontend (UI) and backend (API) test cases using Playwright.
- **Scalable & Maintainable Code:** Utilize the Page Object Model design pattern for enhanced code organization and maintainability.
- **Environment-driven Configuration:** Manage sensitive data and configurations through secure environment variables.
- **Optimized Load Testing:** Utilize k6 for load testing

## Table of contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Running k6 Load Tests](#running-k6-load-tests)

## Features
This project offers the following key features:

- **Unified Automation Suite:** Perform both UI and API testing within a single, cohesive framework.
- **Environment-driven Configuration:** Manage sensitive data and configurations securely using environment variables, preventing accidental exposure.
- **Modular and Reusable Code:** Utilize the Page Object Model pattern to enhance code organization and maintainability, facilitating future modifications.

## Prerequisites
To utilize this project effectively, you'll need the following:

- Node.js (version 14 or later)
- npm (version 6 or later)
- k6 (installation instructions provided)

## Setup Instructions

1. **Clone this repository:**
    ```sh
    git clone https://github.com/EmekaKalu/playwright-k6-automation.git
    cd playwright-k6-automation
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Install k6:**
    - **For Mac**
        ```sh
        brew install k6
        ```
    - ***For Windows using Chocolately package manager (https://chocolatey.org/)***
        ```sh
        choco install k6
        ```
    - ***For Windows using Windows Package Manager (https://github.com/microsoft/winget-cli)***
        ```sh
        winget install k6 --source winget
        ```
4. **Create a Moralis Account:**
    Visit [Moralis Admin](https://admin.moralis.io/) and register for an account.

5. **Configure Environment Variables:**
    Create a `.env` file in the root directory of your project and add your Moralis login credentials and the following;
    ```plaintext
    EMAIL=your-email@example.com 
    PASSWORD=your-secure-password
    GETWALLETNFTENDPOINT=getWalletNFTendpoint from documentation
    MORALIS_URL=url to moralis admin
    ```

## Running Tests

**Run all tests with Playwright:**
```sh
npx playwright test
```

This command will:
- Execute both UI and API test cases.
- Generate and store the Node Key.
- Generate and store the API Key.

## Running k6 Load Tests
1. Navigate to the `K6` directory:
    ```sh
    cd k6
    ```
2. Run the load test script using the following command, replacing placeholders with your actual values:
    ```sh
    k6 run load_test.js -e API_KEY=<your-api-key> -e NODE_KEY=<your-node-key> -e GETWALLETNFTENDPOINT=<getWalletNFTEndpoint> 
