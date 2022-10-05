'use strict';

const io = require('socket.io-client');
const socket = io('http://localhost:3002/caps');
const handlePickup = require('./handlePickup');
const handleDelivered = require('./handleDelivered');
const { Chance } = require('chance');

socket.on('connect', () => {
  console.log(`connected to CAPS as ${socket.id}`);
});

setInterval(() => {
  console.log('------- NEW ORDER FOUND -------');
  handlePickup(socket);
}, 5000)


socket.on('DELIVERED', handleDelivered(socket));

module.exports = socket;
