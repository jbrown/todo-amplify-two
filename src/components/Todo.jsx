import React from "react";

const Todo = ({ name, description }) => {
  return (
    <div>
      {name}
      {description}
    </div>
  );
};

Todo.fragments = {
  todo: `
  fragment TodoFragment on Todo {
    id
    name
    description
  }
  `
};

export default Todo;
