'use strict';

const events = require('../eventPool');

function pickup(payload) {
  payload.event = 'PICKUP';
  events.emit('log', payload);
  console.log(`VENDOR: new order ready for pickup, order id: ${payload.orderId}`);
}

function delivered(payload) {
  payload.event = 'DELIVERED';
  events.emit('log', payload);
  console.log(`VENDOR: thank you ${payload.customer} your order with id: ${payload.orderId} has been delivered`);
}

module.exports = {
  pickup: pickup,
  delivered: delivered,
};