import awsconfig from "../../src/aws-exports";
import selectors from "../support/selectors";

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
    cy.login("testuser", "password");

    cy.get(selectors.todosList).should("have.length", 3);

    cy.get(selectors.newTodoInput).type("Four");
    cy.get(selectors.saveNewTodoButton).click();

    cy.get(selectors.todosList).should("have.length", 4);
  });

  it("allows todos to be deleted", function() {
    cy.mockOperation("ListTodos", {
      data: {
        listTodos: {
          items: [
            { id: "1", name: "One", __typename: "Todo" },
            { id: "2", name: "Two", __typename: "Todo" }
          ],
          nextToken: null,
          __typename: "ModelTodoConnection"
        }
      }
    });

    cy.mockOperation("DeleteTodo", {
      data: {
        deleteTodo: {
          id: 1,
          __typename: "Todo"
        }
      }
    });

    cy.visit("/");
    cy.login("testuser", "password");

    cy.get(selectors.todosList).should("have.length", 2);

    cy.get(selectors.todoListItem)
      .first()
      .as("firstTodo");
    cy.get("@firstTodo")
      .find('[data-test="todo-list-item__delete"]')
      .click();

    cy.get(selectors.todosList).should("have.length", 1);
    cy.get(selectors.todoListItem)
      .first()
      .should("contain", "Two");
  });
});
