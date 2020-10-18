export interface TodoItem {
  id: number;
  description: string;
}

let currentId = 1;

let todos: TodoItem[] = [
  {
    id: currentId++,
    description: "Buy Milk",
  },
  {
    id: currentId++,
    description: "Learn React",
  },
];

function mockedApiCall<T, Args extends any[]>(
  fn: (...args: Args) => T
): (...args: Args) => Promise<T> {
  return (...args: Args) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        try {
          resolve(fn(...args));
        } catch (e) {
          reject(e);
        }
      }, 1000)
    );
}

export default {
  listTodos: mockedApiCall(() => todos),
  addTodo: mockedApiCall((description: string) => {
    if (description === "") {
      throw new Error("Todo description cannot be empty");
    }

    if (todos.some((todo) => todo.description === description)) {
      throw new Error("A Todo item with the same description already exists.");
    }

    const todo: TodoItem = {
      id: currentId++,
      description,
    };
    todos = [...todos, todo];
    return todo;
  }),
  removeTodo: mockedApiCall((id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  }),
};
