import { Given, When, Then } from "@cucumber/cucumber";
import { expect, Browser, Page } from "@playwright/test";
import { chromium } from "playwright";

let browser: Browser;
let page: Page;

Given("the user is on the login page", async function () {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("http://localhost:3000/login");
});

When("the user enters an invalid username and password", async function () {
  await page.fill('input[name="username"]', "user3");
  await page.fill('input[name="password"]', "password3");
});

When('the user clicks on the "Login" button', async function () {
  await page.click('button[type="submit"]');
});

Then(
  "an error message {string} should be displayed",
  async function (errorMessage: string) {
    await expect(page.locator(".error")).toHaveText(errorMessage);
  }
);

Then("the user should remain on the login page", async function () {
  await expect(page).toHaveURL("http://localhost:3000/login");
});

Then("the login fields should retain the entered data", async function () {
  await expect(page.locator('input[name="username"]')).toHaveValue("user3");
  await expect(page.locator('input[name="password"]')).toHaveValue("password3");
});
