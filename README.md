# daria_poliahai
MQA to AQA Program 2023

Running Cypress Tests for Sauce Demo
This guide describes how to run Cypress automated tests for the https://www.saucedemo.com/ website locally.

Before running the tests, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- Cypress test runner (installed globally): npm install cypress -g

Steps: 
1. Clone the repository: git clone https://github.com/darpol14/daria_poliahai.git
2. Navigate to the project directory: cd daria_poliahai
3. Install project dependencies: npm install
4. Start the Cypress test runner: npx cypress open
5. Select the following file: open cypress folder -> e2e -> 3-my-own-case -> finalTask.cy.js

Expected outcome:

1. Cypress will open your web browser and launch the https://www.saucedemo.com/ website.
2. The automated tests will run one by one.
3. The Cypress Test Runner GUI will display the results of each test, including any passed, failed, or skipped tests.

Troubleshooting:

1. If you encounter any errors, consult the Cypress documentation or search online for solutions to specific error messages.
2. Ensure you're using the correct versions of Node.js, npm, and Cypress.
3. Verify that the project dependencies are installed correctly.

Further Resources:

Cypress Documentation: https://docs.cypress.io/guides/overview/why-cypress
Sauce Labs Cypress Testing Guide: https://docs.saucelabs.com/web-apps/automated-testing/cypress/