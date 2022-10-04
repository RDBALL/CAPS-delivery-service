'use strict';

const events = require('../index');
const driver = require('../src/deliveryDriver');
const logger = require('../src/eventLogger');
const Chance = require('chance');

let chance = new Chance();

const payload = {
  storeId: chance.integer({min: 1 , max: 9999}),
  orderId: chance.integer({min: 1 , max: 9999}),
  customer: chance.name(),
  address: chance.address(),
};

describe('Testing driver event emit logging', () => {
  test('Should log that the driver is transiting the order', () => {
    jest.spyOn(console, 'log');

    events.on('log', logger);
    payload.event = 'shipping';

    events.on('shipping', driver.shipping);
    events.emit('shipping', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: shipping orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });

  test('Should log that the driver has delivered the order', () => {
    jest.spyOn(console, 'log');

    payload.event = 'delivered';

    events.on('delivered', driver.delivered);
    events.emit('delivered', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
});