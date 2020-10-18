import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

interface SuperContextType<P = any, T = any> {
  context: Context<T>;
  factory: (props: P) => T;
  props: P;
  options?: Partial<CreateSuperContextOptions>;
}

export interface CreateSuperContextOptions {
  displayName: string;
  memoize: boolean;
}

export type SuperContextProps = PropsWithChildren<{
  contexts: (SuperContextType | ((props?: any) => SuperContextType))[];
  defaultOptions?: Partial<CreateSuperContextOptions>;
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

  const { context, factory, props, options }: SuperContextType =
    typeof superContext === "function" ? superContext() : superContext;

  const nextIndex = index + 1;

  let value = factory(props);
  const memoizeOrDefault = options?.memoize ?? defaultOptions?.memoize ?? false;
  const deps = memoizeOrDefault
    ? typeof value === "object"
      ? Object.values(value)
      : value instanceof Array
      ? value
      : [value]
    : [value];
  value = useMemo(() => value, deps);

  useEffect(() => {
    context.displayName = options?.displayName ?? defaultOptions?.displayName ?? "SuperContext";
  }, [context, options?.displayName, defaultOptions?.displayName]);

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
  options: Partial<CreateSuperContextOptions> = {}
): [(props: P) => SuperContextType<P, T>, () => T] {
  const defaultValue = {} as T;
  const context = createContext<T>(defaultValue);
  const useContextHook = () => {
    const value = useContext<T>(context);
    if (value === defaultValue) {
      const forName = options?.displayName ? `(for ${options.displayName}) ` : "";
      throw new Error(
        `Super context hook ${forName}was called, but the context was not provided. Make sure to include the context to a SuperContext.`
      );
    }
    return value;
  };
  return [(props: P) => ({ context, factory, props, options }), useContextHook];
}
