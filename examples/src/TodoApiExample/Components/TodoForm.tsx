import React, { FormEvent, useState } from "react";
import { useTodos } from "../Contexts";

const TodoForm = () => {
  const { addTodo } = useTodos();

  const [description, setDescription] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState();

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitLoading) return;

    setSubmitError(undefined);
    setSubmitLoading(true);
    try {
      await addTodo(description);
      setDescription("");
    } catch (e) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
      requestAnimationFrame(() => {
        document.getElementById("todo-input")?.focus();
      });
    }
  };

  return (
    <form onSubmit={submit}>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}
      <input
        placeholder="New Todo"
        id="todo-input"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        disabled={submitLoading}
      />
      <button type="submit" disabled={submitLoading}>
        Add
      </button>
    </form>
  );
};

export default TodoForm;
