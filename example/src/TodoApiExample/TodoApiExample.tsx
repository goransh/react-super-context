import React from "react";
import { SuperContext } from "react-super-context";
import { todoContext, todoFilterContext } from "./Contexts";
import TodoList from "./Components/TodoList";
import TodoForm from "./Components/TodoForm";
import TodoFilter from "./Components/TodoFilter";

const TodoApiExample = () => {
  return (
    <SuperContext contexts={[todoContext, todoFilterContext]}>
      <TodoFilter />
      <TodoList />
      <TodoForm />
    </SuperContext>
  );
};

export default TodoApiExample;
