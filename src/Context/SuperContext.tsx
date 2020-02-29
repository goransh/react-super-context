import React, {createContext, ReactNode, useContext} from "react";

const Super = createContext({} as any);

type SubContext<T = any> = (state?: any) => T;
interface SubContexts {
    [key: string]: SubContext
}

export const SuperContext = ({subContexts, children}: { subContexts: SubContexts, children?: ReactNode }) => {
    const value: any = {};

    for (let [context, func] of Object.entries(subContexts)) {
        value[context] = func(value);
    }
    return (<Super.Provider value={value}>{children}</Super.Provider>)
};

function useSuperContext<T = any>(context:SubContext<T>, state?: any) {
    const superContext = useContext(Super);
    const contextId = context.name;
    const value = superContext[contextId] ?? state?.[contextId];
    if (value === undefined) {
        throw Error(`Unknown context '${contextId}'. Did you add it to the subContexts list? Did you return a value from the context?`)
    }
    return value as T;
}

export function createSuperContext<T>(context: SubContext<T>) {
    return (state?: any) => useSuperContext(context, state);
}
