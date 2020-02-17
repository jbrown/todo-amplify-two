import awsconfig from "../../src/aws-exports";

describe("Todos:", function() {
  beforeEach(function() {
    cy.mockGraphQL(awsconfig.aws_appsync_graphqlEndpoint);
  });

  it("allows a user to create a new todo", function() {
    cy.mockOperation("ListTodos", {
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
    cy.mockOperation("CreateTodo", {
      data: {
        createTodo: {
          id: "4",
          name: "Four",
          __typename: "Todo"
        }
      }
    });

    cy.visit("/");
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
