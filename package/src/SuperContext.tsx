import React, { PropsWithChildren } from "react";

import { CreateSuperContextOptions, SuperContextDefinition } from "./CreateSuperContext";

export type SuperContextProps = PropsWithChildren<{
  /**
   * Contexts provided by the SuperContext.
   */
  contexts: (SuperContextDefinition | (() => SuperContextDefinition))[];
  /**
   * Options to apply to all contexts provided by the SuperContext. Will be overwritten by any
   * context specific options.
   */
  defaultOptions?: Partial<CreateSuperContextOptions<unknown>>;
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

type SubContextRequiredOptions = Pick<CreateSuperContextOptions<unknown>, "displayName">;

// library's default options, can be overridden
const fallbackOptions: SubContextRequiredOptions = {
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
  // Get displayName from (1) context options or (2) super context defaults or (3) library defaults
  context.displayName =
    options?.displayName ?? defaultOptions?.displayName ?? fallbackOptions.displayName;

  const value = factory(props);
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
