'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'COMPLETE';
  socket.emit('log', payload);
  console.log(`DRIVER: delivered orderId: ${payload.orderId}`);
};
