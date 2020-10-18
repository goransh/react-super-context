import { useState } from "react";
import { createSuperContext, memoInterceptor } from "react-super-context";

interface CounterContextProps {
  initial: number;
}

const [counterContext, useCounter] = createSuperContext(
  ({ initial }: CounterContextProps) => {
    const [count, setCount] = useState(initial);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(Math.max(0, count - 1));

    return { count, increment, decrement };
  },
  {
    displayName: "Counter",
    interceptors: [memoInterceptor],
  }
);

export { counterContext, useCounter };
