import React, {Context, createContext, PropsWithChildren, useContext} from "react";

interface SuperContextType<P = any, T = any> {
    context: Context<T>;
    hook: (props: P) => T;
    props: P;
}

export type SuperContextProps = PropsWithChildren<{ contexts: (SuperContextType | ((props?: any) => SuperContextType))[] }>;

export const SuperContext = ({contexts, children}: SuperContextProps) =>
    contexts.length === 0
        ? <>{children}</>
        : <SuperContextProvider contexts={contexts} index={0}>{children}</SuperContextProvider>;

const SuperContextProvider = ({contexts, index, children}: SuperContextProps & { index: number }) => {
    const superContext = contexts[index];
    if (!superContext) throw new Error("SuperContext was null/undefined");

    const {context, hook, props}: SuperContextType = (typeof superContext === "function" ? superContext() : superContext);

    const nextIndex = index + 1;

    return (
        <context.Provider value={hook(props)}>
            {nextIndex < contexts.length
                ? <SuperContextProvider contexts={contexts} index={nextIndex}>{children}</SuperContextProvider>
                : children}
        </context.Provider>
    );
};

// could maybe benefit from partial type argument inference: https://github.com/microsoft/TypeScript/issues/26242
export function createSuperContext<T, P = any>(hook: (props: P) => T, displayName?: string): [(props: P) => SuperContextType<P, T>, () => T] {
    const context = createContext<T>({} as T);
    context.displayName = displayName ?? "SuperContext";
    const useContextHook = () => useContext<T>(context);
    return [(props: P) => ({context, hook, props}), useContextHook];
}
