import React from "react";

const Todo = ({ id, name, description, onDelete }) => {
  return (
    <div>
      {name}
      {description}
      <button onClick={() => onDelete(id)} style={{ marginLeft: 10 }}>
        delete
      </button>
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
