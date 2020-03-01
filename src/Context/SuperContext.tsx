import React, {createContext, PropsWithChildren, useContext} from "react";

const Super = createContext<ContextMap>(new Map<SubContext, any>());

export type SubContext<T = any> = (state?: any) => T;
export type ContextMap = Map<SubContext, any>;

export const SuperContext = ({subContexts, children}: PropsWithChildren<{ subContexts: SubContext[] }>) => {
    const map = new Map<SubContext, any>();

    for (let context of subContexts) {
        map.set(context, context(map));
    }
    return (<Super.Provider value={map}>{children}</Super.Provider>)
};

function useSuperContext<T = any>(context: SubContext<T>, state?: ContextMap) {
    const contextMap = useContext(Super);
    if (contextMap.has(context)) return contextMap.get(context) as T;

    if (!state || !state.has(context)) {
        throw Error(`Unknown context '${context.name}'. Did you add it to the subContexts list? ` +
            'If this is called from another SuperContext make sure you\'re passing the state argument.')
    }

    return state.get(context) as T;
}

export function createSuperContext<T>(context: SubContext<T>) {
    return (state?: ContextMap) => useSuperContext(context, state);
}
