import React, {createContext, PropsWithChildren, useContext} from "react";

export type SubContext<T = any> = (state?: any) => T;
export type ContextMap = Map<SubContext, any>;
export type SuperContextProps = PropsWithChildren<{ contexts: SubContext[] }>;

const Super = createContext<ContextMap>(new Map<SubContext, any>());

export const SuperContext = ({contexts, children}: SuperContextProps) => {
    const map = new Map<SubContext, any>();

    for (let context of contexts) {
        map.set(context, context(map));
    }
    return (<Super.Provider value={map}>{children}</Super.Provider>)
};

function useSuperContext<T = any>(context: SubContext<T>, state?: ContextMap): T {
    const contextMap = useContext(Super);
    // check 'has' first because 'get' can return undefined and still be valid
    if (contextMap.has(context)) return contextMap.get(context) as T;

    if (!state?.has(context)) {
        throw Error(`Unknown context '${context.name}'. Did you add it to the subContexts list? ` +
            'If this is called from another SuperContext make sure you\'re passing the state argument.')
    }

    return state!.get(context) as T;
}

export function createSuperContext<T>(context: SubContext<T>) {
    return (state?: ContextMap) => useSuperContext(context, state);
}
