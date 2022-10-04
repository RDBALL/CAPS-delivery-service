'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3002/caps');

socket.on('connect', () => {
  console.log(`connected to CAPS as ${socket.id}`);
});

socket.on('PICKUP', (payload) => {

  setTimeout(() => {
    console.log(`DRIVER : picked up orderId ${payload.orderId}`);
    socket.emit('IN-TRANSIT', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`DRIVER: delivered orderId: ${payload.orderId}`);
    socket.emit('DELIVERED', payload);
  }, 1000);
});