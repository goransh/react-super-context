import { createSuperContext } from "react-super-context";
import { useMemo, useState } from "react";
import { useTodos } from "./TodoContext";

const [todoFilterContext, useFilteredTodos] = createSuperContext(() => {
  const { todoItems } = useTodos();

  const [filter, setFilter] = useState("");

  const filteredTodoItems = useMemo(() => {
    const regex = new RegExp(filter, "i");
    return todoItems.filter((item) => regex.test(item.description));
  }, [todoItems, filter]);

  return {
    filter,
    setFilter,
    filteredTodoItems,
  };
});

export { todoFilterContext, useFilteredTodos };
