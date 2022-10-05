'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const handlePickup = require('./handlePickup');
const handleDelivered = require('./handleDelivered');

socket.on('connect', () => {
  console.log(`connected to CAPS as ${socket.id}`);
});

handlePickup(socket);

socket.on('DELIVERED', handleDelivered(socket));

module.exports = socket;
