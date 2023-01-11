import React from "react";
import { CounterContextBeforeProvider } from "./Contexts/CounterContextBefore";
import { EvenOrOddContextBeforeProvider } from "./Contexts/EvenOrOddContextBefore";

const WithoutSuperContextExample = () => {
  return (
    <CounterContextBeforeProvider>
      <EvenOrOddContextBeforeProvider>
        <div>Your app with consumers comes here</div>
      </EvenOrOddContextBeforeProvider>
    </CounterContextBeforeProvider>
  );
};

export default WithoutSuperContextExample;
