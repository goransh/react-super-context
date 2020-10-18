import React from "react";
import { useFilteredTodos } from "../Contexts";

const TodoFilter = () => {
  const { filter, setFilter } = useFilteredTodos();

  return (
    <div>
      <input
        placeholder="Filter"
        id="filter-input"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
    </div>
  );
};

export default TodoFilter;
