import React from 'react';
import './App.css'
import {LongPulling} from "./LongPulling";
import EventSourcing from "./EventSourcing";
import WebSocket from "./WebSocket";

const App = () => {
    return (
        <div>
            <LongPulling/>
        </div>
    );
};

export default App;