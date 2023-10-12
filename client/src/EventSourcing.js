import {useEffect, useState} from "react";
import axios from "axios";

const style = {
    div1: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    div2: {
        display: 'flex',
        gap: 10,
        marginTop: 20,
        flexDirection: 'column',
        width: '600px',
        height: '100vh',
        border: '1px solid lightgray',
        borderRadius: 15
    },
    input: {
        fontSize: '30px',
        border: '1px solid lightgray',
        borderRadius: 15
    },
    button: {
        fontSize: '30px',
        border: '1px solid lightgray',
        borderRadius: 15
    },
    response: {
        border: '1px solid lightgray',
        fontSize: '30px',
        borderRadius: 15
    }
}

export function EventSourcing() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:1000/connect');
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data);
            setMessages(prevState => [...prevState, message]);
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:1000/create-message', {
            id: Date.now(),
            message: inputValue,
        })
    }

    return (
        <div style={style.div1}>
            <div style={style.div2}>
                <input
                    value={inputValue}
                    onChange={(event) => {setInputValue(event.target.value)}}
                    style={style.input}
                    type='text'/>
                <button
                    onClick={sendMessage}
                    style={style.button}
                >
                    Отправить сообщение
                </button>
                {messages.map((message) => {
                    return (
                        <div style={style.response} key={message.id}>
                            {message.id}. {message.message}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}