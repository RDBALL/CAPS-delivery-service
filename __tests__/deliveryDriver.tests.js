'use strict';

const event = require('../index');
const driver = require('../src/deliveryDriver');
const eventLogger = require('../src/eventLogger');
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

    event.on('log', eventLogger);
    payload.event = 'shipping';

    event.on('shipping', driver.shipping);
    event.emit('shipping', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: shipping orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });

  test('Should log that the driver has delivered the order', () => {
    jest.spyOn(console, 'log');

    payload.event = 'delivered';

    event.on('delivered', driver.delivered);
    event.emit('delivered', payload);

    expect(console.log).toHaveBeenCalledWith(`DRIVER: delivered orderId: ${payload.orderId}`);
    expect(console.log).toHaveBeenCalledWith(payload);
  });
});