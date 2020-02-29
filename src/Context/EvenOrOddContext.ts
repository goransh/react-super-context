import {ContextMap, createSuperContext} from "./SuperContext";
import {useCounter} from "./CounterContext";

export const EvenOrOdd = (state: ContextMap) => {
    const {count} = useCounter(state);

    return count % 2 === 0 ? "even" : "odd";
};


export const useEvenOrOdd = createSuperContext<string>(EvenOrOdd);

