import { Context, createContext, useContext } from "react";

export interface SuperContextDefinition<P = any, T = any> {
  context: Context<T>;
  factory: (props: P) => T;
  props: P;
  options?: Partial<CreateSuperContextOptions<T>>;
}

export interface SuperContextWithProps<P = any, T = any> {
  (props: P): SuperContextDefinition<P, T>;
}

export interface SuperContextWithoutProps<T = any> {
  (): SuperContextDefinition<any, T>;
}

export interface CreateSuperContextOptions<T> {
  /**
   * The context provider component's display name in error messages.
   */
  displayName: string;
  /**
   * Value provided when consuming this context (calling the hook) in a test environment.
   * If not provided, will return an empty object.
   */
  testValue: T;
  /**
   * Override the test environment flag. Should only be necessary when not using NODE_ENV to set test environment.
   */
  testEnvironment: boolean;
}

// could maybe benefit from partial type argument inference: https://github.com/microsoft/TypeScript/issues/26242
export function createSuperContext<T>(
  factory: () => T,
  options?: Partial<CreateSuperContextOptions<T>>
): [context: SuperContextWithoutProps<T>, hook: () => T];
export function createSuperContext<T, P = any>(
  factory: (props: P) => T,
  options?: Partial<CreateSuperContextOptions<T>>
): [context: SuperContextWithProps<P, T>, hook: () => T];
export function createSuperContext<T, P = any>(
  factory: (props: P) => T,
  options: Partial<CreateSuperContextOptions<T>> = {}
): [context: SuperContextWithProps<P, T> | SuperContextWithoutProps<T>, hook: () => T] {
  const defaultValue = {} as T;
  const context = createContext<T>(defaultValue);
  const useSuperContext = () => {
    const value = useContext<T>(context);
    if (value === defaultValue) {
      if (options.testEnvironment ?? process?.env?.NODE_ENV === "test") {
        return options.testValue ?? defaultValue;
      }
      const forName = options?.displayName ? `(for ${options.displayName}) ` : "";
      throw new Error(
        `Super context hook ${forName}was called, but the context was not provided. Make sure to include the context in a SuperContext.`
      );
    }
    return value;
  };
  const Context: SuperContextWithProps<P, T> = (props: P) => ({ context, factory, props, options });

  return [Context, useSuperContext];
}
