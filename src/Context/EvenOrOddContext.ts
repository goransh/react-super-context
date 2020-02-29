import {createSuperContext} from "./SuperContext";
import {useCounter} from "./CounterContext";

export const EvenOrOdd = (state: any) => {
    const {count} = useCounter(state);

    return count % 2 === 0 ? "even" : "odd";
};


export const useEvenOrOdd = createSuperContext<string>(EvenOrOdd);

