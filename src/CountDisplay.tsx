import React from 'react';
import {useCounter} from "./Context/CounterContext";
import {useEvenOrOdd} from "./Context/EvenOrOddContext";

export const CountDisplay = () => {
    const test = useCounter();
    const evenOrOdd = useEvenOrOdd();

    return (
        <div>
            {test.count} ({evenOrOdd})
        </div>
    );
};
