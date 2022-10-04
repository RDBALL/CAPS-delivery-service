'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const Chance = require('chance');
const chance = new Chance();

socket.on('connect', () => {
  console.log(`connected to CAPS as ${socket.id}`);
});


socket.on('DELIVERED', (payload) => {
  setTimeout(() => {
    let payload = {
      storeId: chance.integer({ min: 1, max: 9999 }),
      orderId: chance.integer({ min: 1, max: 9999 }),
      customer: chance.name(),
      address: chance.address(),
    };
    socket.emit('PICKUP', payload);
  }, 2000)
});
