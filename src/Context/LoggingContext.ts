import {useEffect} from "react";
import {useCounter} from "./CounterContext";
import {useEvenOrOdd} from "./EvenOrOddContext";

export const Logging = (state: any) => {
    const {count} = useCounter(state);
    const evenOrOdd = useEvenOrOdd(state);
    useEffect(() => {
        console.log(`The current count is ${count} which is ${evenOrOdd}`);
    }, [count, evenOrOdd]);

    return 1
};

