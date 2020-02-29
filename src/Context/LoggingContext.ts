import {useEffect} from "react";
import {CounterContext} from "./CounterContext";

export const Logging = ({Counter, EvenOrOdd}: { Counter: CounterContext, EvenOrOdd: string }) => {
    const {count} = Counter;
    useEffect(() => {
        console.log(`The current count is ${count} which is ${EvenOrOdd}`);
    }, [count, EvenOrOdd]);

    return 1
};

