import { createSuperContext } from "react-super-context";
import { useCounter } from "./CounterContext";

const [EvenOrOddContext, useEvenOrOdd] = createSuperContext(() => {
  const { count } = useCounter();

  return count % 2 === 0 ? "even" : "odd";
});

export { EvenOrOddContext, useEvenOrOdd };
