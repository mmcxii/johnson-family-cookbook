describe("login tests", () => {
  const cyTestUser = {
    email: "user@test.com",
    password: "password",
  };

  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get("[data-testid='login_button']")
      .click()
      .url()
      .should("include", "/login");
  });

  it("prevents users from logging in with an incorrect email or password and informs them that their credentials were invalid", () => {
    cy.get("[data-testid='login_form__email_input']").type(
      "incorrect@login.com",
    );
    cy.get("[data-testid='login_form__password_input']").type(
      "an_incorrect_password",
    );
    cy.get("[data-testid='login_form__submit_button']").click();

    cy.get("[data-testid='login_form__error_message']").should(
      "have.text",
      "Incorrect email or password.",
    );
  });

  it("allows users with an active account to sign in", () => {
    cy.get("[data-testid='login_form__email_input']").type(cyTestUser.email);
    cy.get("[data-testid='login_form__password_input']").type(
      cyTestUser.password,
    );
    cy.get("[data-testid='login_form__submit_button']").click();
  });
});
