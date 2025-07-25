/* Scenario:  Playwright API Tests for Thinking Tester Contact List App

Scenario Description: 
Test Case 1: User Login
Description: Logs in using valid credentials and stores the JWT token

Test Case 2: Create a New Contact
Description: Sends POST request to create a contact using stored token

Test Case 3: Get All Contacts
Description: Sends GET request to fetch all contacts for the user

Test Case 4: Get a Single Contact by ID
Description: Sends GET request using contact ID to fetch contact details

Test Case 5: Update Contact (PUT)
Description: Replaces the contact with new details using PUT method

Test Case 6: Partial Update Contact (PATCH)
Description: Partially updates the contact using PATCH method (only phone)

Test Case 7: Delete Contact
Description: Sends DELETE request to remove the contact by ID
*/

import { test, expect } from "@playwright/test";

const baseURL = "https://thinking-tester-contact-list.herokuapp.com";
const testUser = {
  email: "jay.duvvuri@abc.com",
  password: "Test@123",
};

let token = "";
let contactId = "";

test.describe("Contact List API Tests", () => {
  test("Login with valid credentials", async ({ request }) => {
    const res = await request.post(`${baseURL}/users/login`, {
      data: testUser,
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    token = body.token;
    expect(token).toBeTruthy();
  });

  test("Add a new contact (POST /contacts)", async ({ request }) => {
    const res = await request.post(`${baseURL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        firstName: "John",
        lastName: "Doe",
        birthdate: "1990-01-01",
        email: "john.doe@example.com",
        phone: "1234567890",
        street1: "123 Main St",
        city: "Metropolis",
        stateProvince: "NY",
        postalCode: "12345",
        country: "USA",
      },
    });
    expect(res.status()).toBe(201);
    const body = await res.json();
    contactId = body._id;
    expect(contactId).toBeTruthy();
  });

  test("Get Contact List (GET /contacts)", async ({ request }) => {
    const res = await request.get(`${baseURL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("Get Contact by ID (GET /contacts/:id)", async ({ request }) => {
    const res = await request.get(`${baseURL}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstName).toBe("John");
  });

  test("Update Contact (PUT /contacts/:id)", async ({ request }) => {
    const res = await request.put(`${baseURL}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: {
        firstName: "Jane",
        lastName: "Doe",
        birthdate: "1990-01-01",
        email: "jane.doe@example.com",
        phone: "0987654321",
        street1: "456 Elm St",
        city: "Gotham",
        stateProvince: "CA",
        postalCode: "54321",
        country: "USA",
      },
    });
    expect(res.status()).toBe(200);
  });

  test("Partial Update Contact (PATCH /contacts/:id)", async ({ request }) => {
    const res = await request.patch(`${baseURL}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { phone: "5555555555" },
    });
    expect(res.status()).toBe(200);
  });

  test("Delete Contact (DELETE /contacts/:id)", async ({ request }) => {
    const res = await request.delete(`${baseURL}/contacts/${contactId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(res.status()).toBe(200);
  });
});
