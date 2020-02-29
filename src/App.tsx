import React from 'react';
import {SuperContext} from "./Context/SuperContext";
import {CountDisplay} from "./CountDisplay";
import {CounterButton} from "./CounterButton";
import {EvenOrOdd} from "./Context/EvenOrOddContext";
import {Counter} from "./Context/CounterContext";
import {Logging} from "./Context/LoggingContext";

function App() {
    return (
        <div>
            <SuperContext subContexts={{
                Counter,
                EvenOrOdd,
                Logging
            }}>
                <CountDisplay/>
                <CounterButton/>
            </SuperContext>
        </div>
    );
}

export default App;
