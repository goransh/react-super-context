# react-super-context

A tiny wrapper library around the React Context API that reduces the amount of boilerplate code required to create and consume contexts.

## Features

* Create contexts with no boilerplate
* No more nested context providers
* Throws an error when consuming a context that has no provider instead of failing silently
* Built with TypeScript
* Small bundle size

## Installation

```
npm i react-super-context
```

## Before and After

### Before

```typescript jsx
// when using TypeScript, you must define an interface for the context's value to get proper type hints
interface CounterContextModel {
  count: number;
  increment: () => void;
  decrement: () => void;
}

// createContext expects a default value that is used if there are no providers for the context
const CounterContext = createContext<CounterContextModel>({
  count: 0,
  increment: () => {},
  decrement: () => {},
});

// we export a provider component that is responsible for the context's states 
export const CounterContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return (
    <CounterContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
};

// we also export a hook that can be used to consume the context in our components
export const useCounter = () => useContext(CounterContext);
```

### After
```typescript jsx
// createSuperContext returns a custom provider and a hook for consumption
const [counterContext, useCounter] = createSuperContext(() => {
  // the state logic is the same as before
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  // we now simply have to return the context's value
  // when using TypeScript, the types are inferred and the useCounter hook will have proper type hints
  return { count, increment, decrement };
});

export { counterContext, useCounter };
```

### Before
```typescript jsx
const App = () => {
  return (
    <CounterContextProvider>
      <MySecondContextProvider>
        <MyThirdContextProvider>
            <div>Your app with consumers comes here</div>
        </MyThirdContextProvider>
      </MySecondContextProvider>
    </CounterContextProvider>
  );
};
```

### After
```typescript jsx
const App = () => (
  <SuperContext contexts={[counterContext, mySecondContext, myThirdContext]}>
    <div>Your app with consumers comes here</div>
  </SuperContext>
);
```

## Examples

### 1. Simple example

**1**. Use the `createSuperContext` function to create your context. It takes a factory function that returns the context's value and returns a context object as well as a hook to consume the state. 
```javascript
// CounterContext.ts
const [counterContext, useCounter] = createSuperContext(() => {
  const [count, setCount] = useState(0);
  return {count, setCount};
});

export {counterContext, useCounter };
```
**2**. To create a provider for the context, add the `SuperContext` component in your app and pass it the `counterContext` created by the `createSuperContext` call. 
```typescript jsx
// App.tsx
const App = () => (
  <SuperContext contexts={[counterContext]}>
    <CountDisplay/>
    <CounterButton/>
  </SuperContext>
);
```

**3**. Consume the context in your components using the `useCounter` hook.
```typescript jsx
// CountDisplay.tsx
const CountDisplay = () => {
  const { count } = useCounter();
  return <div>{count}</div>;
};

// CounterButton.tsx 
const CounterButton = () => {
  const { count, setCount } = useCounter();
  return <button onClick={() => setCount(count + 1)}>+1</button>;
};
```

### 2. Use multiple contexts

**1**. Create a second context that uses `useCounter`.

```javascript
// EvenOrOddContext.ts
const [evenOrOddContext, useEvenOrOdd] = createSuperContext(() => {
  const { count } = useCounter();
  return count % 2 === 0 ? "even" : "odd";
});

export { evenOrOddContext, useEvenOrOdd };
```

**2**. Remember to add it to the contexts lists. The order of the contexts matters.
```typescript jsx
// App.tsx
const App = () => (
  <SuperContext contexts={[counterContext, evenOrOddContext]}>
    <CountDisplay/>
    <CounterButton/>
  </SuperContext>
);
```

`evenOrOddContext` depends on `counterContext` so if they were given the other way around (`contexts={[evenOrOddContext, counterContext]}`), then the `useCounter` call in `EvenOrOddContext.ts` will throw an error.

**3**. Consume the new context.

```typescript jsx
// CountDisplay.tsx
export const CountDisplay = () => {
  const { count } = useCounter();
  const evenOrOdd = useEvenOrOdd();

  return <div>{count} ({evenOrOdd})</div>;
};
```

### 3. Use hooks as you normally would
```typescript jsx
const [logging] = createSuperContext(() => {
  const { count } = useCounter();
  const evenOrOdd = useEvenOrOdd();

  useEffect(() => {
    console.log(`The current count is ${count} which is ${evenOrOdd}`);
  }, [count, evenOrOdd]);
});

export default logging;
```

Remember to always add your context objects to the `SuperContext` component.

### 4. Passing props

**1**. Create a super context with the desired props.

```typescript
// CounterContext.ts
interface CounterContextProps {
  initial: number;
}

const [counterContext, useCounter] = createSuperContext(({ initial }: CounterContextProps) => {
  const [count, setCount] = useState(initial);
  return { count, setCount };
});

export {counterContext, useCounter };
```

**2**. `counter` is a function that you can pass the props to.

```javascript
// App.tsx
const App = () => (
  <SuperContext contexts={[counter({ initial: 10 })]}>
    <CountDisplay/>
    <CounterButton/>
  </SuperContext>
);
```

### 5. TypeScript

In all the examples above, TypeScript is able to infer the types of both the context's value (the value returned by the factory function and by the generated hook) and the contexts' props. 

```typescript jsx
const CountDisplay = () => {
  const { count } = useCounter(); // inferred type: { count: number, increment: () => void, decrement: () => void }
  const evenOrOdd = useEvenOrOdd(); // inferred type: "even" | "odd"

  return <div>{count} ({evenOrOdd})</div>;
};
```

However, you can also define types explicitly:

**1**. Type given explicitly in `createSuperContext` call.
```typescript
// CounterContext.ts
interface CounterContext {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const [counter, useCounter] = createSuperContext<CounterContext>(() => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(Math.max(0, count - 1));

  return { count, increment, decrement };
});
```

**2**. Type inferred when consuming the context.
```typescript jsx
const CountDisplay = () => {
  const { count } = useCounter(); // inferred type: CounterContext
  return <div>{count}</div>;
};
```

### 6. Using props with Typescript

The simplest approach is to define the prop type in the argument for the factory function.

```typescript
interface CounterContextProps {
  initial: number;
}

const [counterContext, useCounter] = createSuperContext(({ initial }: CounterContextProps) => {
  const [count, setCount] = useState(initial);
  return { count, setCount };
});
```

If you have defined the context's value type explicitly, you must pass the prop type as the second generic argument (at least [until TypeScript gets support for partial type argument inference](https://github.com/microsoft/TypeScript/issues/26242)).
```typescript
const [counter, useCounter] = createSuperContext<CounterContext, CounterContextProps>(({initial}) => {
  const [count, setCount] = useState(initial);
  return { count, setCount };
});
```

### 7. Options

The `createSuperContext` function takes an optional object as the second argument, allowing you to specify a number of options.

```typescript
const [counterContext, useCounter] = createSuperContext(
    () => {
        const [count, setCount] = useState(0);
        return { count, setCount };
    },
    {
        displayName: "MyCounterContext",
        testValue: { count: 0, setCount: () => {} },
    }
);
```

`displayName` will be the name of the context provider component in error messages. The `testValue` is the value returned by the `useCounter` hook in a test environment. The library will by default check if `NODE_ENV === "test"` to determine if it is in a test environment, but this can be overridden with the `testEnvironment` option.

If you use many of the same options on all context provided by a `SuperContext`, you can use the `defaultOptions` prop to set defaults:

```typescript jsx
const App = () => (
    <SuperContext
        contexts={[counterContext, evenOrOddContext]}
        defaultOptions={{displayName: "MyContext"}}
    >...</SuperContext>
);
```

In the example above, both the `counterContext` and the `evenOrOddContext` provider components will be displayed as "MyContext" in error messages.

### More examples

[See full examples here.](https://github.com/goransh/react-super-context/tree/master/example/src)