// Inside Chat.js, update the JSX like this

<div>
  {!joined ? (
    <div>
      <h2>Enter your name to join chat</h2>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button onClick={handleJoin}>Join Chat</button>
    </div>
  ) : (
    <div>
      <h2>Real-Time Chat</h2>
      <div className="chat-container">
        {messages.map((msg, index) => (
          <p key={index} className="chat-message">
            <strong>{msg.name}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <div className="message-input">
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  )}
</div>

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Connect to backend

const Chat = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  const handleSendMessage = () => {
    if (!message) return;
    const data = { name, message };
    socket.emit('sendMessage', data); // Send message to server
    setMessage('');
  };

  const handleJoin = () => {
    if (name.trim()) setJoined(true);
  };

  return (
    <div>
      {!joined ? (
        <div>
          <h2>Enter your name to join chat</h2>
          <input 
            type="text" 
            placeholder="Your Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          <button onClick={handleJoin}>Join Chat</button>
        </div>
      ) : (
        <div>
          <h2>Real-Time Chat</h2>
          <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "scroll", padding: "10px" }}>
            {messages.map((msg, index) => (
              <p key={index}><strong>{msg.name}:</strong> {msg.message}</p>
            ))}
          </div>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
