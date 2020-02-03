import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { createTodo } from "../graphql/mutations";
import { QUERY } from "../components/Todos";
import { prependToArray } from "../lib";

const updateCreateTodo = (client, { data: { createTodo } }) => {
  let origTodos = client.readQuery({
    query: QUERY,
    variables: { limit: 4 }
  });
  let data = {
    listTodos: {
      ...origTodos.listTodos,
      items: prependToArray(origTodos.listTodos.items, createTodo)
    }
  };
  client.writeQuery({
    query: QUERY,
    variables: { limit: 4 },
    data
  });
};

const NewTodo = () => {
  const [name, setName] = useState("");
  const [addTodo, { loading, error }] = useMutation(gql(createTodo), {
    onCompleted: () => setName(""),
    update: updateCreateTodo
  });

  return (
    <div className="input-group">
      <input
        className="form-control"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <div className="input-group-append">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            if (name.length > 0) {
              addTodo({ variables: { input: { name } } });
            }
          }}
        >
          Save
        </button>
      </div>
      {error && "An error occurred."}
      {loading && "Saving..."}
    </div>
  );
};

export default NewTodo;
