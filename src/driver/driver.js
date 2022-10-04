'use strict';

const event = require('../eventPool');

function shipping(payload) {
  payload.event = 'shipping';
  event.emit('log', payload);
  console.log(`DRIVER: shipping orderId: ${payload.orderId}`);
}

function delivered(payload) {
  payload.event = 'delivered';
  event.emit('log', payload);
  console.log(`DRIVER: delivered orderId: ${payload.orderId}`);
}

module.exports = {
  shipping: shipping,
  delivered: delivered,
};
