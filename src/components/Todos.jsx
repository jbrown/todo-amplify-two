import React from "react";
import { gql, useQuery } from "@apollo/client";
import { filter } from "graphql-anywhere";
import Todo from "./Todo";

const listTodos = `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ...TodoFragment
      }
      nextToken
    }
  }
  ${Todo.fragments.todo}
`;

const Todos = () => {
  const { loading, error, data } = useQuery(gql(listTodos));

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>Todos</div>
      {data.listTodos.items.map(todo => (
        <Todo key={todo.id} {...filter(gql(Todo.fragments.todo), todo)} />
      ))}
    </div>
  );
};

export default Todos;
