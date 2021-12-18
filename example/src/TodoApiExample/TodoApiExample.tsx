import React from "react";
import { SuperContext } from "react-super-context";
import { TodoContext, TodoFilterContext } from "./Contexts";
import TodoList from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";
import TodoFilter from "./Components/TodoFilter";

const TodoApiExample = () => {
  return (
    <SuperContext contexts={[TodoContext, TodoFilterContext]}>
      <TodoFilter />
      <TodoList />
      <TodoForm />
    </SuperContext>
  );
};

export default TodoApiExample;
