import React from "react";
import { useCounter } from "./Context/CounterContext";
import { useEvenOrOdd } from "./Context/EvenOrOddContext";

export const CountDisplay = () => {
  const { count } = useCounter();
  const evenOrOdd = useEvenOrOdd();

  return (
    <div>
      {count} ({evenOrOdd})
    </div>
  );
};
