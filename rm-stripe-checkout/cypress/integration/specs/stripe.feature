Feature: Stripe checkout functionality
  
        Scenario: Open Stripe checkout and ensure all expected page elements exist
            Given I open Stripe checkout demo page
             Then all page elements exist

        Scenario: Open Stripe checkout and carry out a valid transaction
            Given I open Stripe checkout demo page
             When I complete the form with valid card details and click pay
             Then I verify that payment was successful

        Scenario: Open Stripe checkout and carry out a valid transaction that requires authorisation
            Given I open Stripe checkout demo page
             When I complete the form with valid card details that requires authorisation and click pay
             Then I reach 3D Secure authentication

        Scenario: Open Stripe checkout and carry out a transaction with details that will be declined
            Given I open Stripe checkout demo page
             When I complete the form with invalid card details and click pay
             Then I verify that payment was declined

        Scenario: Open Stripe checkout and carry out a transaction with incomplete card details
            Given I open Stripe checkout demo page
             When I complete the form with incomplete card details and click pay
             Then I verify that payment does not complete due to incomplete details
