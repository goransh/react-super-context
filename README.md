# react-super-context

A wrapper around the React Context API.

## Examples

### 1. Simple example

**1**. Define your context and pass it to the `createSuperContext`-function.
```typescript
// CounterContext.ts
export const Counter = () => {
    const [count, setCount] = useState(0);

    return {count, setCount};
};

export const useCounter = createSuperContext(Counter);
```
**2**. Add the `SuperContext` in your app and pass it your contexts. 
```typescript jsx
// App.tsx
const App = () => (
    <div>
        <SuperContext contexts={[Counter]}>
            <CountDisplay/>
            <CounterButton/>
        </SuperContext>
    </div>
);
```

**3**. Consume the context in your components.
```typescript jsx
// CountDisplay.tsx
export const CountDisplay = () => {
    const {count} = useCounter();
    return <div>{count}</div>;
};

// CounterButton.tsx 
export const CounterButton = () => {
    const {count, setCount} = useCounter();
    return <button onClick={() => setCount(count + 1)}>+1</button>;
};
```

### 2. Use a context from another context

The super context's state isn't updated until all its sub-contexts have been evaluated so if you want to share values between sub-contexts, you must pass the state argument to the hook. You are then able to access values of any of the previous sub-contexts in SuperContext's list.

```typescript jsx
// EvenOrOddContext.ts
export const EvenOrOdd = (state: any) => {
    const {count} = useCounter(state);
    return count % 2 === 0 ? "even" : "odd";
};

export const useEvenOrOdd = createSuperContext<string>(EvenOrOdd);

// App.tsx
const App = () => (
    <div>
        <SuperContext contexts={[Counter, EvenOrOdd]}> {/* The order is important */}
            <CountDisplay/>
            <CounterButton/>
        </SuperContext>
    </div>
);
```

### 3. TypeScript

**1**. Type inferred from context function's return type.
```typescript jsx
// CounterContext.ts
interface CounterContext {
    count: number;
    increment: () => void;
    decrement: () => void;
}

export function Counter(): CounterContext {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(Math.max(0, count - 1));

    return {count, increment, decrement};
}

export const useCounter = createSuperContext(Counter);
```

**2**. Type given explicitly in `createSuperContext` call.
```typescript
// EvenOrOddContext.ts
export const EvenOrOdd = (state: any) => {
    const {count} = useCounter(state);
    return count % 2 === 0 ? "even" : "odd";
};

export const useEvenOrOdd = createSuperContext<string>(EvenOrOdd);
```

**3**. Types inferred when consuming the context
```typescript jsx
export const CountDisplay = () => {
    const {count} = useCounter(); // inferred type: CounterContext
    const evenOrOdd = useEvenOrOdd(); // inferred type: string

    return <div>{count} ({evenOrOdd})</div>;
};
```
