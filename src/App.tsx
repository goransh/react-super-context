import React from 'react';
import {SuperContext} from "./Context/SuperContext";
import {CountDisplay} from "./CountDisplay";
import {CounterButton} from "./CounterButton";
import {evenOrOdd} from "./Context/EvenOrOddContext";
import {counter} from "./Context/CounterContext";
import {logging} from "./Context/LoggingContext";

const App = () => (
    <div>
        <SuperContext contexts={[
            counter,
            evenOrOdd,
            logging
        ]}>
                <CountDisplay/>
                <CounterButton/>
        </SuperContext>
    </div>
);

export default App;
