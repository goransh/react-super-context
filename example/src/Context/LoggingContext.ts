import { useEffect } from "react";
import { useCounter } from "./CounterContext";
import { useEvenOrOdd } from "./EvenOrOddContext";
import { createSuperContext } from "react-super-context";

export const [logging] = createSuperContext(() => {
  const { count } = useCounter();
  const evenOrOdd = useEvenOrOdd();

  useEffect(() => {
    console.log(`The current count is ${count} which is ${evenOrOdd}`);
  }, [count, evenOrOdd]);
});
