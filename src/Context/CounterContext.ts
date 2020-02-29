import {Dispatch, useState} from "react";
import {useSuperContext} from "./SuperContext";

export interface CounterContext {
    count: number;
    setCount: Dispatch<number>;
}

export function Counter(): CounterContext {
    const [count, setCount] = useState(0);

    return {count, setCount};
}

export const useCounter = () => useSuperContext(Counter);
