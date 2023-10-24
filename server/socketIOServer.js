const { Server } = require("socket.io");
const {App} = require("uWebSockets.js");

const PORT = 1000 | process.env.PORT;

const app = App();
const io = new Server();

io.attachApp(app);


io.on('connection', (socket) => {
    console.log(`socket with ${socket.id} connected`);

    //send an event to the client;
    socket.emit('foo', 'bar');

    socket.on('foobar', () => {
        //an event was received from the client;
    })

    //upon disconnect
    socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`)
    });
});

app.listen(PORT, (token) => {
    if (!token) {
        console.warn("port already in use");
    }
    console.log('Server started!!!');
});
