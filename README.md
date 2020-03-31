# react-super-context

A wrapper around the React Context API. Makes it easy to create and consume contexts without having to write a lot of boilerplate.

## Examples

### 1. Simple example

**1**. Use the `createSuperContext` function to create your context. It takes a function that returns the state and returns a context object as well as a hook to access the state. 
```javascript
// CounterContext.js
export const [counter, useCounter] = createSuperContext(() => {
  const [count, setCount] = useState(0);
  return {count, setCount};
});
```
**2**. Add the `SuperContext` in your app and pass it the context (`counter`) created by the `createSuperContext` call. 
```javascript
// App.jsx
const App = () => (
    <div>
        <SuperContext contexts={[counter]}>
            <CountDisplay/>
            <CounterButton/>
        </SuperContext>
    </div>
);
```

**3**. Consume the context in your components.
```javascript
// CountDisplay.jsx
export const CountDisplay = () => {
    const {count} = useCounter();
    return <div>{count}</div>;
};

// CounterButton.jsx 
export const CounterButton = () => {
    const {count, setCount} = useCounter();
    return <button onClick={() => setCount(count + 1)}>+1</button>;
};
```

### 2. Use multiple contexts

**1**. Add a second context that uses `useCounter`.

```javascript
// EvenOrOddContext.js
export const [evenOrOdd, useEvenOrOdd] = createSuperContext(() => {
    const {count} = useCounter();
    return count % 2 === 0 ? "even" : "odd";
});
```

**2**. Remember to add it to the contexts lists. The order of the contexts matters.
```javascript
// App.jsx
const App = () => (
    <div>
        <SuperContext contexts={[counter, evenOrOdd]}>
            <CountDisplay/>
            <CounterButton/>
        </SuperContext>
    </div>
);
```

`evenOrOdd` depends on `counter` so if they were given the other way around (`contexts={[evenOrOdd, counter]}`), then `useEvenOrOdd` wouldn't work correctly.

**3**. Consume the new context.

```javascript
// CountDisplay.jsx
export const CountDisplay = () => {
    const {count} = useCounter();
    const evenOrOdd = useEvenOrOdd();

    return <div>{count} ({evenOrOdd})</div>;
};
```

### 3. Use hooks as you normally would
```javascript
export const [logging] = createSuperContext(() => {
    const {count} = useCounter();
    const evenOrOdd = useEvenOrOdd();

    useEffect(() => {
        console.log(`The current count is ${count} which is ${evenOrOdd}`);
    }, [count, evenOrOdd]);
});
```

Remember to always add your context objects to the `SuperContext` component.

### 4. Passing props

**1**. Create a super context with the desired props.

```javascript
// CounterContext.js
export const [counter, useCounter] = createSuperContext(({initial}) => {
    const [count, setCount] = useState(initial);
    return {count, setCount};
});
```

**2**. `counter` is a function that you can pass the props to.

```javascript
// App.jsx
const App = () => (
    <div>
        <SuperContext contexts={[counter({initial: 10})]}>
            <CountDisplay/>
            <CounterButton/>
        </SuperContext>
    </div>
);
```

### 5. TypeScript

**1**. Type given explicitly in `createSuperContext` call.
```typescript
// CounterContext.ts
export interface CounterContext {
    count: number;
    increment: () => void;
    decrement: () => void;
}

export const [counter, useCounter] = createSuperContext<CounterContext>(() => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(Math.max(0, count - 1));

    return {count, increment, decrement};
});
```

**2**. Type inferred from context function's return type.
```typescript
// EvenOrOddContext.ts
export const [evenOrOdd, useEvenOrOdd] = createSuperContext(() => {
    const {count} = useCounter();
    return count % 2 === 0 ? "even" : "odd";
});
```

**3**. Types inferred when consuming the context
```typescript jsx
export const CountDisplay = () => {
    const {count} = useCounter(); // inferred type: CounterContext
    const evenOrOdd = useEvenOrOdd(); // inferred type: "even" | "odd"

    return <div>{count} ({evenOrOdd})</div>;
};
```

### 6. Using props with Typescript

You can either define the type of the context and props in the generic type arguments
```typescript
export const [counter, useCounter] = createSuperContext<CounterContext, {initial: number}>(({initial}) => {
    const [count, setCount] = useState(initial);
    return {count, setCount};
});
```

or in the parameter and return types

```typescript
export const [counter, useCounter] = createSuperContext(({initial}: {initial: number}) => {
    const [count, setCount] = useState(initial);
    return <CounterContext>{count, setCount};
    // or return {count, setCount} as CounterContext;
});
```

Doing a combination of the two approaches above will prevent Typescript from inferring the prop types.
