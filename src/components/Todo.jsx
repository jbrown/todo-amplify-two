import React from "react";

const Todo = ({ id, name, onDelete }) => {
  return (
    <div data-test="todo-list-item" className="d-flex">
      <span data-test="todo-list-item__name" className="flex-grow-1">
        {name}
      </span>
      <div className="btn-group">
        <button
          data-test="todo-list-item__delete"
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
