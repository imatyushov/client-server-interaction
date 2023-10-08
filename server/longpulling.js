const express = require('express');
const cors = require('cors');
const events = require('events');


const PORT = 2000 | process.env.PORT;

const emitter = new events.EventEmitter();
const application = express();

application.use(cors());
application.use(express.json());

application.get('/messages',(request, response) => {
    emitter.once('newMessage', (message) => {
        response.status(200).json(message);
    })
});

application.post('/create-message',(request, response) => {
    const message = request.body;
    emitter.emit('newMessage', message);
    response.status(200).json('Successful post query');
});

application.listen(PORT, () => console.log(`Server has been started on Port ${PORT}`))