import React from "react";
import { SuperContext } from "react-super-context";
import { CountDisplay } from "./Components/CountDisplay";
import { CounterButton } from "./Components/CounterButton";
import { CounterContext, EvenOrOddContext, LoggingContext } from "./Contexts";

const CountExample = () => (
  <SuperContext contexts={[CounterContext({ initial: 10 }), EvenOrOddContext, LoggingContext]}>
    <CountDisplay />
    <CounterButton />
  </SuperContext>
);

export default CountExample;
