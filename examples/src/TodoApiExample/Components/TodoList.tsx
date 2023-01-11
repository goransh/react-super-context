import React, { useState } from "react";
import { useFilteredTodos, useTodos } from "../Contexts";
import usePromise from "react-use-promise";
import "./TodoList.css";

const TodoList = () => {
  const { listTodos, removeTodo } = useTodos();
  const { filteredTodoItems } = useFilteredTodos();

  // you can put this logic into the context instead of exposing listTodos
  const [, fetchError, fetchState] = usePromise(listTodos, []);

  const [currentlyRemoving, setCurrentlyRemoving] = useState<number | undefined>();

  const remove = async (id: number) => {
    try {
      setCurrentlyRemoving(id);
      await removeTodo(id);
    } catch (e) {
      alert(e.message);
    } finally {
      setCurrentlyRemoving(undefined);
    }
  };

  if (fetchError) {
    return <p style={{ color: "red" }}>{fetchError}</p>;
  }

  if (fetchState === "pending") {
    return <p>Loading...</p>;
  }

  if (filteredTodoItems.length === 0) {
    return <p>No results</p>;
  }

  return (
    <ul>
      {filteredTodoItems.map(({ id, description }) => (
        <li
          key={id}
          className={`todoListItem ${!!currentlyRemoving ? "removing" : ""}`}
          onClick={() => remove(id)}
        >
          {currentlyRemoving === id ? <span>Removing...</span> : description}
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
