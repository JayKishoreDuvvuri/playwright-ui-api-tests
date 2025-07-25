/* Scenario: End-to-End test
Login with valid/invalid credentials.
Creating a new contact (e.g., a todo/user).
Editing the existing contact.
Delete the same contact.

Scenario Description: 
This is an end-to-end test where user logging in with valid credentials to add a contact and 
then edit the same contact and finally delete the same contact.

const baseURL = "https://thinking-tester-contact-list.herokuapp.com";
await page.goto(`${baseURL}/login`);
*/

import { test, expect } from "@playwright/test";

const validUser = {
  email: "jay.duvvuri@abc.com",
  password: "Test@123",
};

const invalidUser = {
  email: "fake@example.com",
  password: "WrongPass",
};

test.describe("Contact List E2E Tests", () => {
  test("Login with valid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", validUser.email);
    await page.fill("#password", validUser.password);
    await page.click("#submit");
    await expect(page).toHaveURL(`/contactList`);
    await expect(page.locator("text=Contact List")).toBeVisible();
  });

  test("Login with invalid credentials", async ({ page }) => {
    await page.goto("/login");
    await page.fill("#email", invalidUser.email);
    await page.fill("#password", invalidUser.password);
    await page.click("#submit");
    await expect(
      page.locator("text=Incorrect username or password")
    ).toBeVisible();
  });

  test("Create, Edit and Delete a contact", async ({ page }) => {
    // Login first
    await page.goto("/login");
    await page.fill("#email", validUser.email);
    await page.fill("#password", validUser.password);
    await page.click("#submit");
    await expect(page).toHaveURL(`/contactList`);
    await expect(
      page.locator("//h1[normalize-space()='Contact List']")
    ).toBeVisible();
    await expect(page.locator("#add-contact")).toBeVisible();

    // Create a contact
    await page.click("text=Add a New Contact");
    await page.fill("#firstName", "John");
    await page.fill("#lastName", "Doe");
    await page.fill("#birthdate", "2000-01-01");
    await page.fill("#email", "john.doe@example.com");
    await page.fill("#phone", "1234567890");
    await page.fill("#street1", "123 Main St");
    await page.fill("#city", "Metropolis");
    await page.fill("#stateProvince", "CA");
    await page.fill("#postalCode", "90210");
    await page.fill("#country", "USA");
    await page.click("#submit");

    await expect(
      page.locator("(//td[normalize-space()='John Doe'])[1]")
    ).toBeVisible();

    // Edit the contact
    await page.click(`xpath=(//tr[@class='contactTableBodyRow'])[1]`);
    await page.click("#edit-contact");
    await expect(page).toHaveURL(`/editContact`);
    await expect(
      page.locator("//h1[normalize-space()='Edit Contact']")
    ).toBeVisible();
    await page.waitForTimeout(1000);
    await page.fill("#firstName", "George");
    await page.fill("#lastName", "Phillips");
    await page.click("#submit");
    await page.waitForTimeout(2000);
    await page.click("#return");
    await page.waitForTimeout(2000);
    await expect(
      page.locator("(//td[normalize-space()='George Phillips'])[1]")
    ).toBeVisible();

    // Delete the contact
    await page.click(`(//td[normalize-space()='George Phillips'])[1]`);
    page.on("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });
    await page.getByRole("button", { name: "Delete Contact" }).click();
    await page.waitForTimeout(1000);
    await expect(
      page.locator("(//td[normalize-space()='George Phillips'])[1]")
    ).not.toBeVisible();
    await expect(page).toHaveURL(`/contactList`);
  });
});
