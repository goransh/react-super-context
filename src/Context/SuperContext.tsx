import React, {Context, createContext, createElement, PropsWithChildren, useContext} from "react";

interface SubContext<T = any> {
    context: Context<T>;
    hook: () => T
}

export type SuperContextProps = PropsWithChildren<{ contexts: SubContext[] }>;

export const SuperContext = ({contexts, children}: SuperContextProps) =>
    <SubContextProvider contexts={contexts} index={0}>{children}</SubContextProvider>;

const SubContextProvider = ({contexts, index, children}: SuperContextProps & { index: number }) => {
    const value = contexts[index].hook();

    return createElement(
        contexts[index].context.Provider,
        {value}, index + 1 < contexts.length ?
        <SubContextProvider contexts={contexts} index={index + 1}>{children}</SubContextProvider> : children);
};

export function createSuperContext<T>(hook: () => T): [SubContext<T>, () => T] {
    const context = createContext<T>({} as T);
    const useContextHook = () => useContext<T>(context);
    return [{context, hook}, useContextHook];
}
