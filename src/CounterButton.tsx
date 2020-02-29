import React from 'react';
import {useCounter} from "./Context/CounterContext";

export const CounterButton = () => {
    const {count, setCount} = useCounter();

    return (
        <button onClick={() => setCount(count + 1)}>+1</button>
    );
};
