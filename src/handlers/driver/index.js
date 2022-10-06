'use strict';

const Client = require('../../handleMessage/messageClient');
const driverClient = new Client('driver');

console.log('Fetching events from server');

driverClient.publish('get-all', { eventName: 'PICKUP', queueId: 'driver' });
driverClient.subscribe('PICKUP', (payload) => {
  driverClient.publish('received', payload);
  console.log(`DRIVER: Order id ${payload.messageId} is in-transit`);
  driverClient.publish('IN-TRANSIT', payload);
  console.log('DRIVER: Order id', payload.messageId, 'has been delivered');
  driverClient.publish('DELIVERED', payload);
});

module.exports = driverClient;