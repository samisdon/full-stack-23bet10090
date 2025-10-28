const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors()); // Allow requests from frontend

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"]
  }
});

// Listen for Socket.io connections
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Listen for chat messages
  socket.on('sendMessage', (data) => {
    // Broadcast message to all connected clients
    io.emit('receiveMessage', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
