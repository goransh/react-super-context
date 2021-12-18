# Changelog

## 1.0.0
_18 December 2021_

* **Breaking change**: Removed the `interceptors` feature that was deprecated in version 0.2.1. [Read more about this here](https://github.com/goransh/react-super-context/wiki/Interceptors-deprecated).
* Updated naming convention of the context objects/functions to use PascalCase (like a component) instead of camelCase in readme and examples

## 0.2.2
_9 April 2021_

* TypeScript improvements: When providing a super context that accepts props, you will now get a type error if you don't provide any props

Example:
```tsx
// CounterContext.ts
const [counterContext, useCounter] = createSuperContext(({ initial }: CounterContextProps) => {
    ...
});

// App.tsx
// This is now a type error:
const App = () => <SuperContext contexts={[counterContext]}></SuperContext>

// Correct usage (no errors):
const App = () => <SuperContext contexts={[counterContext({ initial: 10 })]}></SuperContext>
```

## 0.2.1 
_27 February 2021_

* Mark the `interceptors` feature as deprecated and link to wiki explaining why in docs and console warnings.
* Remove `interceptors` examples.
* Remove experimental warning from readme since API is now unlikely to change before version 1.0.0.

## 0.2.0
_21 January 2021_

* New `testValue` option for contexts. This is the value returned by the super context hook in a test environment.
* New `testEnvironment` option for context. Can be used to override the `NODE_ENV === "test"` check to determine if running in a test environment.

## 0.1.1

* Export as CommonJS
* Add MIT license

## 0.1.0

Initial (experimental) release
