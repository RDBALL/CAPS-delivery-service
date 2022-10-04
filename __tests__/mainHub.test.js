'use strict';

const event = require('../index');
const mainHub = require('../src/mainHub');
const eventLogger = require('../src/eventLogger');
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

    event.on('log', eventLogger);
    payload.event = 'newOrder';
    event.on('newOrder', mainHub.newOrder);
    event.emit('newOrder', payload);

    expect(console.log).toHaveBeenCalledWith(`HUB: new order  - orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });

  test('mainHub has an orderID ready for pickup', () => {
    jest.spyOn(console, 'log');

    event.on('log', eventLogger);
    payload.event = 'pickup';
    event.on('pickup', mainHub.pickup);
    event.emit('pickup', payload);

    expect(console.log).toHaveBeenCalledWith(`HUB: orderId: ${payload.orderId} ready for pickup`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
});