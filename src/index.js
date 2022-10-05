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

  eventPool.forEach(event => {
    socket.on(event, (payload) => socket.broadcast.emit(event, payload));
  });
});


