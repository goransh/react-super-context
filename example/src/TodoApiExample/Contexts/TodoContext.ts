import { createSuperContext } from "react-super-context";
import Client, { TodoItem } from "../ApiClient/TodoApiClient";
import { useCallback, useEffect, useState } from "react";

const [todoContext, useTodos] = createSuperContext(
  () => {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

    const listTodos = useCallback(async () => {
      const response = await Client.listTodos();
      setTodoItems(response);
    }, [setTodoItems]);

    const addTodo = useCallback(
      async (description: string) => {
        const result = await Client.addTodo(description);
        setTodoItems((items) => [...items, result]);
      },
      [setTodoItems]
    );

    const removeTodo = useCallback(
      async (id: number) => {
        await Client.removeTodo(id);
        setTodoItems((items) => items.filter((item) => item.id !== id));
      },
      [setTodoItems]
    );

    useEffect(() => console.log(todoItems), [todoItems]);

    return {
      todoItems,
      listTodos,
      addTodo,
      removeTodo,
    };
  },
  {
    displayName: "TodoContext",
    memoize: true,
  }
);

export { todoContext, useTodos };
