'use strict';

const events = require('../index');
const mainHub = require('../src/mainHub');
const logger = require('../src/eventLogger');
const Chance = require('chance');

let chance = new Chance();

const payload = {
  storeId: chance.integer({ min: 1, max: 9999 }),
  orderId: chance.integer({ min: 1, max: 9999 }),
  customer: chance.name(),
  address: chance.address(),
};

describe('Testing mainHub event emit logging', () => {

  test('mainHub has received an order and returns an orderID', () => {
    jest.spyOn(console, 'log');

    events.on('log', logger);
    payload.event = 'newOrder';
    events.on('newOrder', mainHub.newOrder);
    events.emit('newOrder', payload);

    expect(console.log).toHaveBeenCalledWith(`HUB: new order  - orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });

  test('mainHub has an orderID ready for pickup', () => {
    jest.spyOn(console, 'log');

    events.on('log', logger);
    payload.event = 'pickup';
    events.on('pickup', mainHub.pickup);
    events.emit('pickup', payload);

    expect(console.log).toHaveBeenCalledWith(`HUB: orderId: ${payload.orderId} ready for pickup`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
});