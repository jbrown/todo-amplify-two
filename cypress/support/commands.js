// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const responseStub = result =>
  Promise.resolve({
    json: () => Promise.resolve(result),
    text: () => Promise.resolve(JSON.stringify(result)),
    ok: true
  });

Cypress.Commands.add("mockOperation", function(operationName, response) {
  cy.get("@operations", { log: false }).then(operations => {
    const newOperations = {
      ...operations,
      [operationName]: response
    };
    cy.wrap(newOperations, { log: false }).as("operations");
    Cypress.log({
      name: "mockOperation",
      displayName: "STUB GRAPHQL OPERATION",
      message: operationName,
      consoleProps: () => ({
        name: operationName,
        response
      })
    });
  });
});

Cypress.Commands.add("mockGraphQL", function(url) {
  cy.wrap({}, { log: false }).as("operations");
  cy.on("window:before:load", win => {
    cy.stub(win, "fetch")
      .withArgs(url)
      .callsFake((url, { body }) => {
        const { operationName } = JSON.parse(body);
        const response = this.operations[operationName];

        if (!response)
          throw new Error(
            `Operation "${operationName}" not stubbed for endpoint ${url}`
          );

        return responseStub(response);
      })
      .as("graphql stub");

    win.fetch.callThrough();
  });
});
