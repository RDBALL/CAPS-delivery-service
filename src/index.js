'use strict';

const { Server } = require('socket.io');
const eventLogger = require('./eventLogger');
const PORT = process.env.PORT || 3002;
const server = new Server(PORT);
const eventPool = require('./eventPool');


const caps = server.of('/caps');

caps.on('connection', (socket) => {

  console.log(socket.id, ' connected to CAPS');

  socket.on('log', eventLogger);

  socket.on('PICKUP', payload => {
    socket.join(payload.store);
    console.log(socket.id);
  });

  socket.on('IN-TRANSIT', payload => {
    socket.join(payload.store);
    console.log(socket.id);
  });

  eventPool.forEach(event => {
    socket.on(event, (payload) => socket.broadcast.emit(event, payload));
  });
});


