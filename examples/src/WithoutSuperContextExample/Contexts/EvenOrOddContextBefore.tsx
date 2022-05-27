import React, { createContext, PropsWithChildren, useContext } from "react";
import { useCounterContextBefore } from "./CounterContextBefore";

type EvenOrOddContextBeforeModel = "even" | "odd";

const EvenOrOddContextBefore = createContext<EvenOrOddContextBeforeModel>("even");

export const EvenOrOddContextBeforeProvider = ({ children }: PropsWithChildren<{}>) => {
  const { count } = useCounterContextBefore();
  const value = count % 2 === 0 ? "even" : "odd";
  return (
    <EvenOrOddContextBefore.Provider value={value}>{children}</EvenOrOddContextBefore.Provider>
  );
};

export const useEvenOrOddContextBefore = () => useContext(EvenOrOddContextBefore);
