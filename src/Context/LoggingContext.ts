import {useEffect} from "react";
import {useCounter} from "./CounterContext";
import {useEvenOrOdd} from "./EvenOrOddContext";
import {ContextMap} from "./SuperContext";

export const Logging = (state: ContextMap) => {
    const {count} = useCounter(state);
    const evenOrOdd = useEvenOrOdd(state);
    useEffect(() => {
        console.log(`The current count is ${count} which is ${evenOrOdd}`);
    }, [count, evenOrOdd]);
};

