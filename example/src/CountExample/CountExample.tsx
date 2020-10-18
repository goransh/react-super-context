import React from "react";
import { SuperContext } from "react-super-context";
import { CountDisplay } from "./Components/CountDisplay";
import { CounterButton } from "./Components/CounterButton";
import { counterContext, evenOrOddContext, loggingContext } from "./Contexts";

const CountExample = () => (
  <SuperContext contexts={[counterContext({ initial: 10 }), evenOrOddContext, loggingContext]}>
    <CountDisplay />
    <CounterButton />
  </SuperContext>
);

export default CountExample;
