# Stripe Checkout Demo

This readme describes my approach to testing the [Stripe Checkout Demo](https://checkout.stripe.dev/preview) page assigned for the QA take home test for MoonPay.

I really enjoyed working on this and have used the following to demonstrate some of the skills I have learned and continue to develop as an experienced QA professional:

- Cucumber BDD
- Cypress framework using the page object model (POM) design pattern, written in TypeScript
- Use of GitHub actions to run the tests on a schedule

## Test Scenarios

I identified 5 scenarios to exercise the checkotut flow:

1/ Check for the existence of all page elements.

2/ Open Stripe checkout and carry out a valid transaction

3/ Open Stripe checkout and carry out a valid transaction that requires authorisation

4/ Open Stripe checkout and carry out a transaction with details that will be declined

5/ Open Stripe checkout and carry out a transaction with incomplete details

## Test Data

I used the test cards provided with the demo checkout app to drive my scenarios. I abstracted any data that was not consequential to the scenario to the pages file (stripePage.ts).

## Results

Results can be view in the CLI (or in GitHub output) and there is also a video / screenshots recorded for each test.

## Extensions

- Think more about data and how to abstract it from the pages file. Potentially add to its own support file.
- Extend the use of frames. I would dig deeper in the DOM to complete the authorisation of 3DS and view payment completion message.
- If there were more features and scenarios to present results for, I would add a more detailed and user friendly report (e.g. Allure).

## Running the Tests

1/ You will first need to clone / open the test project.
2/ You should then carry out an 'npm install' to get all of the required dependencies.
3/ You should then either open Cypress using the command `npm run cypress:open` and run tests or use the command `npm run test` from the command line (in project root).

## Schedule

The tests are scheduled to run at 2am each night using a GitHub workflow (schedule.yml). 
