import { useState } from "react";
import { createSuperContext } from "react-super-context";

export interface CounterContext {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const [counter, useCounter] = createSuperContext<CounterContext, { initial: number }>(
  ({ initial }) => {
    const [count, setCount] = useState(initial);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(Math.max(0, count - 1));

    return { count, increment, decrement };
  },
  {
    displayName: "Counter",
  }
);
