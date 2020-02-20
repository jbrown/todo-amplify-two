describe("Authenticator:", function() {
  beforeEach(function() {
    cy.visit("/");
  });

  it("allows a user to signin", () => {
    // Step 2: Take an action (Sign in)
    cy.get(selectors.usernameInput).type("testuser");
    cy.get(selectors.signInPasswordInput).type("password");
    cy.get(selectors.signInSignInButton)
      .contains("Sign In")
      .click();

    // Step 3: Make an assertion (Check for sign-out text)
    cy.get(selectors.signOutButton).contains("Sign Out");
  });

  it("allows a user to signout", () => {
    // Step 2: Take an action (Sign in)
    cy.get(selectors.usernameInput).type("testuser");
    cy.get(selectors.signInPasswordInput).type("password");
    cy.get(selectors.signInSignInButton)
      .contains("Sign In")
      .click();

    // Step 3: Make an assertion (Check for sign-out text)
    cy.get(selectors.signOutButton)
      .contains("Sign Out")
      .click();
    cy.get(selectors.signInSignInButton).should("be.visible");
  });
});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]'
};
