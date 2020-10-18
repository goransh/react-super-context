import React from "react";
import CountExample from "./CountExample/CountExample";
import TodoApiExample from "./TodoApiExample/TodoApiExample";

const App = () => (
  <div>
    <h1>SuperContext examples</h1>
    <h2>Counter</h2>
    <CountExample />
    <h2>Todo API</h2>
    <TodoApiExample />
  </div>
);

export default App;
