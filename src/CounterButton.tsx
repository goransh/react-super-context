import React from 'react';
import {useCounter} from "./Context/CounterContext";

export const CounterButton = () => {
    const {increment, decrement} = useCounter();

    return (
        <>
            <button onClick={decrement}>-</button>
            <button onClick={increment}>+</button>
        </>
    );
};
