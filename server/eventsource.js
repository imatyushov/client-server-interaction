const express = require('express');
const cors = require('cors');
const {json} = require('express');
const events = require('events');

const PORT = 1000 | process.env.PORT;

const emitter = new events.EventEmitter();

const application = express();
application.use(cors);
application.use(json);

application.get('/connect', (request, response) => {
    response.write(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/plain;charset=UTF-8',
        'Cache-Control': 'no-cache'
    })
    emitter.on('newMessage', (message) => {
        response.write(`data: ${JSON.stringify(message)} \n\n `)
    })
});

application.post('/create-message', (request, response) => {
    const message = request.body;
    emitter.emit('newMessage', message);
    response.status(200).json('Пост запрос прошел успешно');
});

application.listen(PORT, () => console.log(`Server has been started on Port ${PORT}`))