'use strict';

const server = require('./server');
const HandleVendorQueue = require('../src/handlers/vendor/handleVendorQueue');


const messages = server.of('messages');
const handleVendorQueue = new HandleVendorQueue();

messages.on('connection', (socket) => {

  socket.on('join', (payload) => {
    console.log('Room registered', payload.clientId);
    handleVendorQueue.addQueue(payload.clientId);
    socket.join(payload.clientId);
  });

  socket.on('message', (payload) => {
    console.log('MESSAGE SENT', payload);
    handleVendorQueue.queues[payload.clientId].add(payload.clientId, payload.body);
    socket.to(payload.clientId).emit('message', payload);
  });

  // client needs all messages from a clientId
  socket.on('get-messages', (payload) => {
    handleVendorQueue.queues[payload.clientId].get(payload.clientId).forEach(message => {
      // this emits back to the same client that published the "get-messages"
      socket.emit('message', message);
    });
  });

  socket.on('received', (payload) => {
    let receipt = handleVendorQueue.queues[payload.clientId].read(payload.clientId, payload.body.messageId);
    console.log('MESSAGE REMOVED', payload);
    socket.to(payload.clientId).emit('received', receipt);
  });
});

module.exports = messages;