import React from "react";
import { gql, useQuery } from "@apollo/client";
import { listTodos } from "../graphql/queries";

const Todos = () => {
  const { loading, error, data } = useQuery(gql(listTodos));

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>Todos</div>
      {data.listTodos.items.map(todo => (
        <div key={todo.id}>{todo.name}</div>
      ))}
    </div>
  );
};

export default Todos;
