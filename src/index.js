'use strict';

const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const server = new Server(PORT);

const caps = server.of('/caps');

caps.on('connection', (socket) => {

  console.log(socket.id, ' connected to CAPS');

  socket.on('JOIN', room => {
    console.log(`Joined ${room}` );
    socket.join(room);
  });

  //PICKUP
  socket.on('PICKUP', (payload) => {
    orderProcess('PICKUP', payload);
    caps.to(payload.store).emit('PICKUP', payload);
  });

  //IN-TRANSIT
  socket.on('IN-TRANSIT', (payload) => {
    orderProcess('IN-TRANSIT', payload);
    caps.emit('IN-TRANSIT', payload);
  });

  //DELIVERED
  socket.on('DELIVERED', (payload) => {
    orderProcess('DELIVERED', payload);
    caps.to(payload.store).emit('DELIVERED', payload);
  });

});

function orderProcess(event, payload) {
  let time = new Date();
  console.log('EVENT', {event, time, payload});
}