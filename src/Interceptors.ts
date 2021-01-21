import { useMemo } from "react";

/**
 * Experimental.
 *
 * Intercept the value of a super context. Allows you to read or transform the value before it
 * is passed to the context provider. Triggers after the super context factory.
 */
export type SuperContextInterceptor<T> = (value: T) => T;

/**
 * Experimental.
 *
 * Reduce unnecessary re-renders by wrapping the context's value in a useMemo.
 * If the value is an object, the useMemo's dependencies will be all the values of the object.
 * If the value is an array, the useMemo's dependencies will be the array itself.
 *
 * Requires that the super context factory returns an object or array with a constant amount of values.
 *
 * For this to even work, the values of the object/array must be wrapped in useMemo or useCallback
 * or some other approach so that they do not change on every render.
 *
 * If the object or array contains any functions, make sure to wrap them in useCallback.
 */
export function memoInterceptor<T>(value: T) {
  const deps =
    typeof value === "object" ? Object.values(value) : value instanceof Array ? value : [value];
  return useMemo(() => value, deps);
}
