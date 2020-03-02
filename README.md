# react-super-context

A wrapper around the React Context API.

## Examples

### 1. Simple example

**1**. Use the `createSuperContext`-function to create your context. It takes a function that returns the state and returns a context object as well as a hook to access the state. 
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

### 2. TypeScript

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
