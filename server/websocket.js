const webSocket = require('ws');

const PORT = 1000 | process.env.PORT;

const webSocketServer = new webSocket.WebSocketServer({
   port: PORT
}, () => console.log(`Server successful started on ${PORT} port`));

webSocketServer.on('connection', function connection(webSocket) {
   webSocket.on('message', function (message) {
      message = JSON.parse(message);
      switch (message.type) {
         case 'chat-message':
            broadcastMessage(message);
            break;
         case 'connection':
            broadcastMessage(message);
            break;
      }
   })
})

function broadcastMessage(message) {
   webSocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(message));
   })
}
