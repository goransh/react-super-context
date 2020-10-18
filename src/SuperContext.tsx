import React, { Context, createContext, PropsWithChildren, useContext, useEffect } from "react";
import { SuperContextInterceptor } from "./Interceptors";

export interface SuperContextDefinition<P = any, T = any> {
  context: Context<T>;
  factory: (props: P) => T;
  props: P;
  options?: Partial<CreateSuperContextOptions<T>>;
}

export interface CreateSuperContextOptions<T> {
  displayName: string;
  interceptors: SuperContextInterceptor<T>[];
}

export type SuperContextProps = PropsWithChildren<{
  contexts: (SuperContextDefinition | ((props?: any) => SuperContextDefinition))[];
  defaultOptions?: Partial<CreateSuperContextOptions<any>>;
}>;

export const SuperContext = ({
  contexts,
  defaultOptions,
  children,
}: SuperContextProps): React.ReactElement =>
  contexts.length === 0 ? (
    <>{children}</>
  ) : (
    <SuperContextProvider contexts={contexts} defaultOptions={defaultOptions} index={0}>
      {children}
    </SuperContextProvider>
  );

const SuperContextProvider = ({
  contexts,
  defaultOptions,
  index,
  children,
}: SuperContextProps & { index: number }) => {
  const superContext = contexts[index];
  if (!superContext) throw new Error("SuperContext was null/undefined");

  const { context, factory, props, options }: SuperContextDefinition =
    typeof superContext === "function" ? superContext() : superContext;

  let value = factory(props);

  const interceptors = options?.interceptors ?? defaultOptions?.interceptors;
  if (interceptors) {
    for (const plugin of interceptors) {
      value = plugin(value);
    }
  }

  useEffect(() => {
    context.displayName = options?.displayName ?? defaultOptions?.displayName ?? "SuperContext";
  }, [context, options?.displayName, defaultOptions?.displayName]);

  const nextIndex = index + 1;

  return (
    <context.Provider value={value}>
      {nextIndex < contexts.length ? (
        <SuperContextProvider contexts={contexts} index={nextIndex}>
          {children}
        </SuperContextProvider>
      ) : (
        children
      )}
    </context.Provider>
  );
};

// could maybe benefit from partial type argument inference: https://github.com/microsoft/TypeScript/issues/26242
export function createSuperContext<T, P = any>(
  factory: (props: P) => T,
  options: Partial<CreateSuperContextOptions<T>> = {}
): [(props: P) => SuperContextDefinition<P, T>, () => T] {
  const defaultValue = {} as T;
  const context = createContext<T>(defaultValue);
  const useSuperContext = () => {
    const value = useContext<T>(context);
    if (value === defaultValue) {
      const forName = options?.displayName ? `(for ${options.displayName}) ` : "";
      throw new Error(
        `Super context hook ${forName}was called, but the context was not provided. Make sure to include the context to a SuperContext.`
      );
    }
    return value;
  };
  return [(props: P) => ({ context, factory, props, options }), useSuperContext];
}
