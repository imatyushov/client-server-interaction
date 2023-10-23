import { useState, useEffect } from "react";
import {io} from "socket.io-client";

const CHAT_SERVER_URL = 'ws://localhost:1000/';

const message = {
    id: 1,
    type: 'chat-message',
    body: '!unmute',
    user: {name: 'Ilya', color: 'blue'},
    colorMode: 'blue'
}

//Connects to chat server using IO;
const connectChatServer = () => {
    const socket = io(CHAT_SERVER_URL, {
        transports: ['websocket'],
        path: '/'
    });

    socket.onAny((type, message) => {
        console.log(type, message);
    });

    return socket;
};

export function WebSocket() {
    const [messages, setMessages] = useState([message]);
    useEffect(() => {
        let socket = connectChatServer();
        socket.onAny((type, message) => {
            if (type === 'chat-message') {
                setMessages(messages => [...messages, {
                    body: message.body,
                    user: message.user,
                }])
            }
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div>
            <h1 style={{color: 'red'}}>Magic Chat App</h1>
            <ul>
                {messages.map((message, index) => {
                    return (
                        <li key={index}>
                            <span style={{color: message.user.color}}>{message.user.name}</span> {' '}
                            {message.body}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
