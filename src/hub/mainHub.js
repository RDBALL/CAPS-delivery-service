// 'use strict';
// const events = require('../eventPool');
// const vendor = require('../vendor/handleDelivered');
// const driver = require('../driver/handleDelivered');
// const logger = require('../eventLogger');

// const orderFulfillment = ['pickup', 'in-transit', 'delivered', 'log'];

// module.exports = () => {
//   events.on(orderFulfillment[3], logger);
//   events.on(orderFulfillment[0], vendor.pickup);
//   events.on(orderFulfillment[1], driver.shipping);
//   events.on(orderFulfillment[2], driver.delivered);
//   events.on(orderFulfillment[2], vendor.delivered);
// };