'use strict';

const events = require('../index');

function shipping(payload) {
  payload.event = 'shipping';
  events.emit('log', payload);
  console.log(`DRIVER: shipping orderId: ${payload.orderId}`);
}

function delivered(payload) {
  payload.event = 'delivered';
  events.emit('log', payload);
  console.log(`DRIVER: delivered orderId: ${payload.orderId}`);
}

module.exports = {
  shipping: shipping,
  delivered: delivered,
};
