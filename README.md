### Playwright With JavaScript For The Thinking Testser Website

#### Application Under Test

We are using https://thinking-tester-contact-list.herokuapp.com/ as the Application Under Test. 

- URL: https://thinking-tester-contact-list.herokuapp.com/
- OS : macOS
- IDE : Visual Studio Code

#### Scenarios

```bash
/* Scenario: UI-E2E tests  
   - Login with valid/invalid credentials.
   - Creating a new contact (e.g., a todo/user).
   - Editing the existing contact.
   - Delete the same contact.

Scenario Description: 
This is an end-to-end test where user logging in with valid credentials to add a contact and 
then edit the same contact and finally delete the same contact.

Testname: TC_01_ui_e2e.test.js
```

```bash
Scenario: API tests for Thinking Tester Contact List App

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

Testname: TC_01_api_e2e.test.js
```

#### Installation

Install the dependencies and devDependencies to run the test.

- Clone (OR) Download this repo as zip folder on to your local machine
- Navigate to project's directory on terminal and run the following commands:

Clone the repository

```bash
GitHub: git clone https://github.com/JayKishoreDuvvuri/playwright-ui-api-tests.git
```

Install dependencies
```bash
Make sure Node.js is installed, then run:

npm install
npx playwright install
```

#### Run application

Run Tests Locally

```bash
npm run test:ui  - Run only the UI tests TC_01_ui_e2e.test.js 
npm run test:api - Run only the test TC_01_api_e2e.test.js 
npm run test - Runs all the tests both UI and API and prints test-report locally.
```

Run tests on CI - GitHub Actions

```bash
npm run test:ci - For tests headless on GitHub Actions (CI)
```

#### Playwright Test Report

```bash
Html-test-report : npm run test
```

#### GitHub Actions

```bash
Pipelines: https://github.com/JayKishoreDuvvuri/Playwright-ReactJS/actions/runs/15362829799
```