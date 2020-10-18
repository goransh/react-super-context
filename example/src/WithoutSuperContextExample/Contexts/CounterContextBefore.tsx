import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface CounterContextBeforeModel {
  count: number;
  increment: () => void;
  decrement: () => void;
}

const CounterContextBefore = createContext<CounterContextBeforeModel>({
  count: 0,
  increment: () => {},
  decrement: () => {},
});

export const CounterContextBeforeProvider = ({ children }: PropsWithChildren<{}>) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return (
    <CounterContextBefore.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContextBefore.Provider>
  );
};

export const useCounterContextBefore = () => useContext(CounterContextBefore);
