'use strict';
const Chance = require('chance');

let chance = new Chance();

const payload = {
  storeId: chance.integer({ min: 1, max: 9999 }),
  orderId: chance.integer({ min: 1, max: 9999 }),
  customer: chance.name(),
  address: chance.address(),
};

module.exports = (socket) => {
  payload.event = 'PICKUP';
  socket.emit('JOIN', payload.storeId);
  socket.emit('log', payload);
  console.log(`VENDOR: new order ready for pickup, order id: ${payload.orderId}`);
  socket.emit('PICKUP', payload)
}