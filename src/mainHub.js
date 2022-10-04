'use strict';

const events = require('../index');

console.log(events.emit);

function newOrder(payload) {
  payload.event = 'newOrder';
  events.emit('log', payload);
  console.log(`HUB: new order  - orderId: ${payload.orderId}`);
}

function pickup(payload) {
  payload.event = 'pickup';
  events.emit('log', payload);
  console.log(`HUB: orderId: ${payload.orderId} ready for pickup`);
}

module.exports = {
  pickup: pickup,
  newOrder: newOrder,
};