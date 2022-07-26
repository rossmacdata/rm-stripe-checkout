import { Given, Then, When, And } from "cypress-cucumber-preprocessor/steps";
import stripePage from './src/pages/stripePage';


Given('I open Stripe checkout demo page', () => {
    stripePage.visit();
    stripePage.getCheckout();
});

Then(`all page elements exist`, () => {
    stripePage.elementsExist();
});

When(`I complete the form with valid card details and click pay`, () => {
    stripePage.makePayment('4242424242424242');
});

When(`I complete the form with valid card details that requires authorisation and click pay`, () => {
    stripePage.makePayment('4000000000003220');
});

When(`I complete the form with invalid card details and click pay`, () => {
    stripePage.makePayment('4000000000000002');
});

When(`I complete the form with incomplete card details and click pay`, () => {
    stripePage.makePayment('400000000000000');
});

Then(`I verify that payment was successful`, () => {
    stripePage.checkValidPayment();
});

Then(`I verify that payment was declined`, () => {
    stripePage.checkDeclinedPayment();
});

And('I reach 3D Secure authentication', (authorization) => {
	stripePage.challengePresent();
});

Then(`I verify that payment does not complete due to incomplete details`, () => {
    stripePage.checkIncompleteDetails();
});