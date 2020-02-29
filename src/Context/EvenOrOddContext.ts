import {useSuperContext} from "./SuperContext";
import {CounterContext} from "./CounterContext";

export const EvenOrOdd = ({Counter}: { Counter: CounterContext }) => {
    const {count} = Counter;

    return count % 2 === 0 ? "even" : "odd";
};


export const useEvenOrOdd = () => useSuperContext<string>(EvenOrOdd);

