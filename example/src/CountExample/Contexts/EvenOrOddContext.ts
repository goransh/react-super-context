import { createSuperContext } from "react-super-context";
import { useCounter } from "./CounterContext";

const [evenOrOddContext, useEvenOrOdd] = createSuperContext(() => {
  const { count } = useCounter();

  return count % 2 === 0 ? "even" : "odd";
});

export { evenOrOddContext, useEvenOrOdd };
