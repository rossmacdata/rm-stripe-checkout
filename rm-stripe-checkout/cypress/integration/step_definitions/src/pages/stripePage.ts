import 'cypress-iframe'
const url = 'https://checkout.stripe.dev/preview'

class stripePage {
  
  // Navigation to page / frame
  static visit() {
    cy.visit(url)
  }

  static getCheckout() {
    return cy.frameLoaded('#checkout-demo');
  }

  // Checks for element existence
  static seeTitle() {
    cy.title().should('include', "Explore Stripe Checkout");
  }

  static seeApplePayButton() {
    cy.iframe('#checkout-demo')
    .find('.FakeWalletButton')
    .should('be.visible');
  }

  static seeEmailField()
  {
    cy.iframe('#checkout-demo')
    .find('#email')
    .should('be.visible');
  }

  static seeCardNumber()
  {
    cy.iframe('#checkout-demo')
    .find('#cardNumber')
    .should('be.visible');
  }

  static seeCardExpiry()
  {
    cy.iframe('#checkout-demo')
    .find('#cardNumber')
    .should('be.visible');
  }

  static seeCardCvc()
  {
    cy.iframe('#checkout-demo')
    .find('#cardCvc')
    .should('be.visible');
  }

  static seeBillingName()
  {
    cy.iframe('#checkout-demo')
    .find('#billingName')
    .should('be.visible');
  }

  static seeBillingCountry()
  {
    cy.iframe('#checkout-demo')
    .find('#billingCountry')
    .should('be.visible');
  }

  static seeBillingPostalCode()
  {
    cy.iframe('#checkout-demo')
    .find('#billingPostalCode')
    .should('be.visible');
  }

  static seePaymentButton()
  {
    cy.iframe('#checkout-demo')
    .find('[data-testid="hosted-payment-submit-button"]')
    .should('be.visible');
  }

  // This shows that the state has moved from complete to processing
  static seeButtonStateProcessing()
  {
    cy.iframe('#checkout-demo')
    .find(".SubmitButton--processing")
    .should("be.visible");
  }

  // This shows that the state has moved from complete to processing or error
  static noButtonStateComplete()
  {
    cy.iframe('#checkout-demo')
    .find(".SubmitButton--complete")
    .should("not.exist")

  }

  static paymentConfirmed()
  {
    cy.intercept('POST', '**/confirm').as('confirm')
    cy.wait('@confirm').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body.payment_intent.status).to.eq('succeeded')
    })
  }

  static challengePresent()
  {
    cy.intercept('POST', '**/challenge').as('challenge')
    cy.wait('@challenge').then(({response}) => {
      expect(response.statusCode).to.eq(200)
      expect(response.body).to.contain('Complete a required action for this test payment.')
    })
  }

  // Inputs to page
  static fillEmailField(email)
  {
    cy.iframe('#checkout-demo')
    .wait(3000)
    .find('#email')
    .type(email);
  }

  static fillCardNumber(cardNumber)
  {
    cy.iframe('#checkout-demo')
    .wait(3000)
    .find('#cardNumber')
    .type(cardNumber);
  }

  static fillCardExpiry(cardExpiry)
  {
    cy.iframe('#checkout-demo')
    .find('#cardExpiry')
    .type(cardExpiry);
  }

  static fillCardCvc(cardCvc)
  {
    cy.iframe('#checkout-demo')
    .find('#cardCvc')
    .click()
    .type(cardCvc);
  }

  static fillBillingName(billingName)
  {
    cy.iframe('#checkout-demo')
    .find('#billingName')
    .type(billingName);
  }

  static fillBillingCountry()
  {
    cy.iframe('#checkout-demo')
    .find('#billingCountry')
    .select('GB', { force: true });
  }

  static fillBillingPostalCode(billingPostalCode)
  {
    cy.iframe('#checkout-demo')
    .find('#billingPostalCode')
    .type(billingPostalCode, { force: true });
  }

  static clickPaymentButton()
  {
    cy.iframe('#checkout-demo')
    .find('.SubmitButton')
    .click({force: true})
  }

  // Functions to validate element existence and process
  static elementsExist() {
    this.seeTitle();
    this.seeApplePayButton();
    this.seeEmailField();
    this.seeCardNumber();
    this.seeCardExpiry();
    this.seeCardCvc();
    this.seeBillingName();
    this.seeBillingCountry();
    this.seeBillingPostalCode();
  }
  
  static makePayment(cardNumber) {
    this.fillEmailField('mymail@email.net');
    this.fillCardNumber(cardNumber);
    this.fillCardExpiry('0730');
    this.fillCardCvc('222');
    this.fillBillingName('Robert Jones');
    this.fillBillingCountry();
    this.fillBillingPostalCode('KY11 8AY');
    this.clickPaymentButton();
  }

  static checkValidPayment()
  {
    this.noButtonStateComplete();
    this.seeButtonStateProcessing();
    this.paymentConfirmed();
  }

  static checkDeclinedPayment()
  {
    cy.iframe('#checkout-demo')
    .wait(2000)
    .contains('Your card was declined. Please try a different card.')
  }

  static checkIncompleteDetails()
  {
    cy.iframe('#checkout-demo')
    .wait(2000)
    .contains('Your card number is incomplete.')
  }

}

export default stripePage;