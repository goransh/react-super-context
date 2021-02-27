import React, { PropsWithChildren, useEffect, useMemo } from "react";
import { CreateSuperContextOptions, SuperContextDefinition } from "./CreateSuperContext";

export type SuperContextProps = PropsWithChildren<{
  /**
   * Contexts provided by the SuperContext.
   */
  contexts: (SuperContextDefinition | ((props?: any) => SuperContextDefinition))[];
  /**
   * Options to apply to all contexts provided by the SuperContext. Will be overwritten by any
   * context specific options.
   */
  defaultOptions?: Partial<CreateSuperContextOptions<any>>;
}>;

/**
 * The SuperContext is a provider component for all contexts created with createSuperContext.
 */
export const SuperContext = ({
  contexts,
  defaultOptions,
  children,
}: SuperContextProps): React.ReactElement =>
  contexts.length === 0 ? (
    <>{children}</>
  ) : (
    <SubContext contexts={contexts} defaultOptions={defaultOptions} index={0}>
      {children}
    </SubContext>
  );

type SubContextRequiredOptions = Pick<
  CreateSuperContextOptions<any>,
  "interceptors" | "displayName"
>;

// library's default options, can be overridden
const fallbackOptions: SubContextRequiredOptions = {
  interceptors: [],
  displayName: "SuperContext",
};

const SubContext = ({
  contexts,
  defaultOptions,
  index,
  children,
}: SuperContextProps & { index: number }) => {
  const superContext = contexts[index];
  if (!superContext) throw new Error("SuperContext was null/undefined");

  const { context, factory, props, options }: SuperContextDefinition =
    typeof superContext === "function" ? superContext() : superContext;

  const { displayName, interceptors } = useMemo<SubContextRequiredOptions>(
    () => ({
      ...fallbackOptions, // library defaults
      ...defaultOptions, // defaults of the super context
      ...options, // options of the sub-context
    }),
    [defaultOptions, options]
  );

  let value = factory(props);

  if (interceptors) {
    for (const interceptor of interceptors) {
      value = interceptor(value);
    }

    if (interceptors.length > 0) {
      console.warn(
        "react-super-context: Interceptors have been deprecated, see https://github.com/goransh/react-super-context/wiki/Interceptors-deprecated"
      );
    }
  }

  useEffect(() => {
    context.displayName = displayName;
  }, [displayName]);

  const nextIndex = index + 1;

  return (
    <context.Provider value={value}>
      {nextIndex < contexts.length ? (
        <SubContext contexts={contexts} index={nextIndex}>
          {children}
        </SubContext>
      ) : (
        children
      )}
    </context.Provider>
  );
};
