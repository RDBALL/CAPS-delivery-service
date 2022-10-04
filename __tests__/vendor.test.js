'use strict';

const event = require('../src/eventPool');
const vendor = require('../src/vendor/vendor');
const eventLogger = require('../src/eventLogger');
const Chance = require('chance');

let chance = new Chance();

const payload = {
  storeId: chance.integer({ min: 1, max: 9999 }),
  orderId: chance.integer({ min: 1, max: 9999 }),
  customer: chance.name(),
  address: chance.address(),
};

describe('Testing vendor event emit logging', () => {
  test('vendor has an orderID ready for pickup', () => {
    jest.spyOn(console, 'log');

    event.on('log', eventLogger);
    payload.event = 'pickup';
    event.on('pickup', vendor.pickup);
    event.emit('pickup', payload);

    expect(console.log).toHaveBeenCalledWith(`VENDOR: new order ready for pickup, order id: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
  test('vendor receives notification from driver of delivery', () => {
    jest.spyOn(console, 'log');

    event.on('log', eventLogger);
    payload.event = 'delivered';
    event.on('delivered', vendor.delivered);
    event.emit('delivered', payload);

    expect(console.log).toHaveBeenCalledWith(`VENDOR: thank you ${payload.customer} your order with id: ${payload.orderId} has been delivered`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
});