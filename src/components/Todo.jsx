import React from "react";

const Todo = ({ id, name, onDelete }) => {
  return (
    <div className="d-flex">
      <span className="flex-grow-1">{name}</span>
      <div className="btn-group">
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => onDelete(id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  );
};

Todo.fragments = {
  todo: `
  fragment TodoFragment on Todo {
    id
    name
  }
  `
};

export default Todo;
