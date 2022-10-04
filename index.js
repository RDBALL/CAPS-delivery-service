'use strict';

const mainHub = require('./src/hub/mainHub');
const events = require('./src/eventPool');

const Chance = require('chance');
let chance = new Chance();

mainHub();

const payload = {
  storeId: chance.integer({min: 1 , max: 9999}),
  orderId: chance.integer({min: 1 , max: 9999}),
  customer: chance.name(),
  address: chance.address(),
};

events.emit('pickup', payload);
events.emit('in-transit', payload);
events.emit('delivered', payload);