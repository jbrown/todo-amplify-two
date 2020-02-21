import selectors from "../support/selectors";

describe("Authenticator:", function() {
  beforeEach(function() {
    cy.visit("/");
  });

  it("allows a user to signin", () => {
    cy.login("testuser", "password");
  });

  it("allows a user to signout", () => {
    cy.login("testuser", "password");

    cy.get(selectors.signOutButton)
      .contains("Sign Out")
      .click();
    cy.get(selectors.signInSignInButton).should("be.visible");
  });
});
