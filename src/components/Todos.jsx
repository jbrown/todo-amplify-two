import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { filter } from "graphql-anywhere";
import Todo from "./Todo";
import { deleteTodo } from "../graphql/mutations";
import { removeFromArray } from "../lib";

export const QUERY = gql`
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

const updateDeleteTodo = (client, { data: { deleteTodo } }) => {
  let origList = client.readQuery({
    query: QUERY,
    variables: { limit: 4 }
  });
  let data = {
    listTodos: {
      ...origList.listTodos,
      items: removeFromArray(origList.listTodos.items, deleteTodo)
    }
  };
  client.writeQuery({
    query: QUERY,
    variables: { limit: 4 },
    data
  });
};

const updateTodosFetchMore = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) return previousResult;

  let {
    listTodos: { __typename, items: oldItems }
  } = previousResult;
  let {
    listTodos: { items: newItems, nextToken }
  } = fetchMoreResult;

  return {
    listTodos: {
      __typename,
      items: [...oldItems, ...newItems],
      nextToken
    }
  };
};

const Todos = () => {
  const [removeTodo, { loading: isDeleting }] = useMutation(gql(deleteTodo), {
    update: updateDeleteTodo
  });
  const { loading, error, data, fetchMore } = useQuery(QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4 }
  });

  if (loading && !(data && data.listTodos)) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>Todos</div>
      {isDeleting && <div>deleting todo...</div>}
      {data.listTodos.items.map(todo => (
        <Todo
          key={todo.id}
          onDelete={id => removeTodo({ variables: { input: { id } } })}
          {...filter(gql(Todo.fragments.todo), todo)}
        />
      ))}
      {data.listTodos.nextToken && (
        <div>
          <button
            onClick={() =>
              fetchMore({
                variables: { limit: 2, nextToken: data.listTodos.nextToken },
                updateQuery: updateTodosFetchMore
              })
            }
          >
            Load more
          </button>
          {loading && <div>Loading more...</div>}
        </div>
      )}
    </div>
  );
};

export default Todos;
