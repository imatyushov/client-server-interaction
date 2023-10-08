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

export function LongPulling() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    console.log(inputValue);

    useEffect(() => {
        subscribe();
    }, [])

    const subscribe = async () => {
        try {
            const {
                data,
                request,
                status,
                headers,
                config,
                statusText
            } = await axios.get('http://localhost:2000/messages');

            setMessages(prevState => [...prevState, data]);
            await subscribe();
        } catch (error) {
            setTimeout(() => {
                subscribe();
            }, 300)
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:2000/create-message', {
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
