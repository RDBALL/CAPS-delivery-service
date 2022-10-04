'use strict';
const events = require('../eventPool');
const vendor = require('../vendor/vendor');
const driver = require('../driver/driver');
const logger = require('../eventLogger');

const orderFulfillment = ['pickup', 'in-transit', 'delivered', 'log'];

module.exports = () => {
  events.on(orderFulfillment[3], logger);
  events.on(orderFulfillment[0], vendor.pickup);
  events.on(orderFulfillment[1], driver.shipping);
  events.on(orderFulfillment[2], driver.delivered);
  events.on(orderFulfillment[2], vendor.delivered);
};