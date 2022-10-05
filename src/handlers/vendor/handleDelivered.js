'use strict';

module.exports = (socket) => (payload) => {
  payload.event = 'DELIVERED';
  socket.emit('log', payload);
  console.log(`VENDOR: thank you ${payload.customer} your order with id: ${payload.orderId} has been delivered`);
  socket.emit('COMPLETE', payload)
}
