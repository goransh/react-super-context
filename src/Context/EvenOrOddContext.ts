import {createSuperContext} from "./SuperContext";
import {useCounter} from "./CounterContext";

export const [evenOrOdd, useEvenOrOdd] = createSuperContext(() => {
    const {count} = useCounter();

    return count % 2 === 0 ? "even" : "odd";
});

