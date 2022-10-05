'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'IN-TRANSIT';
  socket.emit('log', payload);
  console.log(`DRIVER : picked up orderId ${payload.orderId}`);
  socket.emit('DELIVERED', payload);
};