import awsconfig from "../../src/aws-exports";

describe("Todos:", function() {
  it("allows a user to create a new todo", () => {
    const responseStub = result =>
      Promise.resolve({
        json: () => Promise.resolve(result),
        text: () => Promise.resolve(JSON.stringify(result)),
        ok: true
      });

    cy.visit("/", {
      onBeforeLoad(win) {
        cy.stub(win, "fetch")
          .withArgs(awsconfig.aws_appsync_graphqlEndpoint)
          .callsFake((url, { body }) => {
            const { operationName } = JSON.parse(body);

            switch (operationName) {
              case "CreateTodo":
                return responseStub({
                  data: {
                    createTodo: {
                      id: "4",
                      name: "Four",
                      __typename: "Todo"
                    }
                  }
                });
              case "ListTodos":
                return responseStub({
                  data: {
                    listTodos: {
                      items: [
                        { id: "1", name: "One", __typename: "Todo" },
                        { id: "2", name: "Two", __typename: "Todo" },
                        { id: "3", name: "Three", __typename: "Todo" }
                      ],
                      nextToken: null,
                      __typename: "ModelTodoConnection"
                    }
                  }
                });
              default:
                return responseStub({});
            }
          })
          .as("graphql stub");

        win.fetch.callThrough();
      }
    });
    cy.get(selectors.usernameInput).type("testuser");
    cy.get(selectors.signInPasswordInput).type("password");
    cy.get(selectors.signInSignInButton)
      .contains("Sign In")
      .click();

    cy.get(selectors.signOutButton).contains("Sign Out");

    cy.get(selectors.todosList).should("have.length", 3);

    cy.get(selectors.newTodoInput).type("Four");
    cy.get(selectors.saveNewTodoButton).click();

    cy.get(selectors.todosList).should("have.length", 4);
  });
});

export const selectors = {
  // Auth component classes
  usernameInput: '[data-test="username-input"]',
  signInPasswordInput: '[data-test="sign-in-password-input"]',
  signInSignInButton: '[data-test="sign-in-sign-in-button"]',
  signOutButton: '[data-test="sign-out-button"]',
  newTodoInput: '[data-test="new-todo-input"]',
  saveNewTodoButton: '[data-test="save-new-todo-button"]',
  todosList: ".list-group-item"
};
