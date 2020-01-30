import React from "react";
import { gql, useQuery } from "@apollo/client";
import { filter } from "graphql-anywhere";
import Todo from "./Todo";

const QUERY = gql`
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
  const { loading, error, data, fetchMore } = useQuery(QUERY, {
    notifyOnNetworkStatusChange: true,
    variables: { limit: 4 }
  });

  if (loading && !(data && data.listTodos)) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>Todos</div>
      {data.listTodos.items.map(todo => (
        <Todo key={todo.id} {...filter(gql(Todo.fragments.todo), todo)} />
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
