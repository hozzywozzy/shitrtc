const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// When a user connects
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    // Handle messages
    socket.on('chat-message', (msg) => {
        io.emit('chat-message', msg);  // Broadcast to all users
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
