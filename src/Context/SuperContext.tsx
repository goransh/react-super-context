import React, {Context, createContext, PropsWithChildren, useContext} from "react";

interface SuperContext<P = any, T = any> {
    context: Context<T>;
    hook: (props: P) => T;
    props: P;
}

export type SuperContextProps = PropsWithChildren<{ contexts: (SuperContext | ((props?: any) => SuperContext))[] }>;

export const SuperContext = ({contexts, children}: SuperContextProps) =>
    <SuperContextProvider contexts={contexts} index={0}>{children}</SuperContextProvider>;

const SuperContextProvider = ({contexts, index, children}: SuperContextProps & { index: number }) => {
    const superContext = contexts[index];
    const {context, hook, props}: SuperContext = (typeof superContext === "function" ? superContext() : superContext);

    return (
        <context.Provider value={hook(props)}>
            {index + 1 < contexts.length
                ? <SuperContextProvider contexts={contexts} index={index + 1}>{children}</SuperContextProvider>
                : children}
        </context.Provider>
    );
};

// could maybe benefit from partial type argument inference: https://github.com/microsoft/TypeScript/issues/26242
export function createSuperContext<T, P = any>(hook: (props: P) => T, displayName?: string): [(props: P) => SuperContext<P, T>, () => T] {
    const context = createContext<T>({} as T);
    context.displayName = displayName ?? "SuperContext";
    const useContextHook = () => useContext<T>(context);
    return [(props: P) => ({context, hook, props}), useContextHook];
}
