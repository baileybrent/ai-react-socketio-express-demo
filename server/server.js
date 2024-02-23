//https://medium.com/@abbasashraff12313/creating-a-real-time-chat-application-with-socket-io-and-react-ecca78c13819

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors= require('cors')

const app = express();

app.use(cors({
    origin: '*'
}));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('sendMessage', (message) => {
        io.emit('message', message); // Broadcast the message to all connected clients
        console.log('message received: ', message);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});