const faker = require("faker");

describe("user creation tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid='create-account_button']")
      .click()
      .url()
      .should("include", "/user/create");

    cy.get("[data-testid='create-account_form__password-input']").type(
      "password",
    );
    cy.get("[data-testid='create-account_form__confirmPassword-input']").type(
      "password",
    );
    cy.get("[data-testid='create-account_form__firstName-input']").type(
      faker.name.firstName(),
    );
    cy.get("[data-testid='create-account_form__lastName-input']").type(
      faker.name.lastName(),
    );
    cy.get("[data-testid='create-account_form__birthday-input']").type(
      faker.date.past().toString(),
    );
    cy.get("[data-testid='create-account_form__genderCode-input']").type(
      "Male",
    );
    cy.get(
      "[data-testid='create-account_form__permissionLevelCode-input']",
    ).type("User");
  });

  it("will not allow a user to create an account with an email that is already in use", () => {
    cy.get("[data-testid='create-account_form__email-input']").type(
      "user@test.com",
    );

    cy.get("[data-testid='create-account_form__submit-button']").click();

    cy.get("[data-testid='create-account_form__email-error']");
  });

  it("will create a user if they enter their information correctly", () => {
    cy.get("[data-testid='create-account_form__email-input']").type(
      "cypress@test.com",
    );

    cy.get("[data-testid='create-account_form__submit-button']").click();
  });
});
