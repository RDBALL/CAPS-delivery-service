'use strict';

const event = require('../eventPool');

function shipping(payload) {
  payload.event = 'IN-TRANSIT';
  event.emit('log', payload);
  console.log(`DRIVER : picked up orderId ${payload.orderId}`);
}

function delivered(payload) {
  payload.event = 'DELIVERED';
  event.emit('log', payload);
  console.log(`DRIVER: delivered orderId: ${payload.orderId}`);
}

module.exports = {
  shipping: shipping,
  delivered: delivered,
};
