import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { createTodo } from "../graphql/mutations";

const NewTodo = () => {
  const [name, setName] = useState("");
  const [addTodo, { loading, error }] = useMutation(gql(createTodo), {
    onCompleted: () => setName("")
  });

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button
        onClick={() => {
          if (name.length > 0) {
            addTodo({ variables: { input: { name } } });
          }
        }}
      >
        Save
      </button>
      {error && "An error occurred."}
      {loading && "Saving..."}
    </div>
  );
};

export default NewTodo;
