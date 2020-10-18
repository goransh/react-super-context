import React from "react";
import { useCounter, useEvenOrOdd } from "../Contexts";

export const CountDisplay = () => {
  const { count } = useCounter();
  const evenOrOdd = useEvenOrOdd();

  return (
    <div>
      {count} ({evenOrOdd})
    </div>
  );
};
