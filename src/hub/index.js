'use strict';

const { Server } = require('socket.io');
const eventLogger = require('./eventLogger');
const PORT = process.env.PORT || 3002;
const server = new Server(PORT);
const Queue = require('../handleMessage/messageQueue');

const caps = server.of('/caps');
const globalQueue = new Queue();

caps.on('connection', socket => {
  console.log('Connected to CAPS on PORT:', PORT);
  socket.on('log', eventLogger);
  socket.on('join', (payload) => {
    console.log('Registering client to room');
    socket.join(payload.queueId);
  });

  socket.on('PICKUP', (payload) => {
    console.log(`NEW ORDER added to QUEUE ----- id:${payload.queueId}`);
    let eventQueue = globalQueue.createIfNoneExists('driver', new Queue());
    eventQueue.create(payload.messageId, payload);
    socket.to('driver').emit('PICKUP', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('DELIVERED', payload.store);
    let eventQueue = globalQueue.createIfNoneExists(payload.store, new Queue());
    eventQueue.create(payload.messageId, payload);
    socket.to(payload.store).emit('DELIVERED', payload);
  });

  socket.on('received', (payload) => {
    let eventQueue = globalQueue.read(payload.queueId);

    if(!eventQueue) throw new Error('No items in queue');

    let message = eventQueue.remove(payload.messageId);
    console.log(`orderId: ${payload.messageId} removed from queue`);
    caps.emit('received', message);
  });

  socket.on('get-all', (payload) => {

    let eventQueue = globalQueue.read(payload.queueId);

    if(!eventQueue) {
      console.log('  No queue found for queueId: ', payload.queueId);
    } else {
      eventQueue.readAllValues().forEach((payload) => {
        socket.emit(payload.eventName, payload);
        console.log('Getting all events in queueId: ', payload.queueId);
      });
    }
  });
});

