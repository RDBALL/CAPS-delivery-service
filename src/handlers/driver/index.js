'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const handleShipping = require('./handleShipping');
const handleDelivered = require('./handleDelivered');

socket.on('connect', () => {
  console.log(`connected to CAPS as ${socket.id}`);
});

socket.on('PICKUP', handleShipping(socket));
socket.on('COMPLETE', handleDelivered(socket));

module.exports = socket;