import { Context, createContext, useContext } from "react";
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
