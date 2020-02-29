import React, {createContext, ReactNode, useContext} from "react";

const Super = createContext({} as any);

interface SubContexts {
    [key: string]: (state?: any) => any
}

export const SuperContext = ({subContexts, children}: { subContexts: SubContexts, children?: ReactNode }) => {
    const value: any = {};

    for (let [context, func] of Object.entries(subContexts)) {
        value[context] = func(value);
    }
    return (<Super.Provider value={value}>{children}</Super.Provider>)
};

export function useSuperContext<T = any>(context: (context?: any) => T) {
    const superContext = useContext(Super);
    const contextId = context.name;
    const value = superContext[contextId];
    if (!value) {
        throw Error(`Unknown context '${contextId}'. Did you add it to the subContexts list? Did you return a value from the context?`)
    }
    return value as T;
}
