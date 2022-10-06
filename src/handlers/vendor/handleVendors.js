'use strict';

const Chance = require('chance');
const chance = Chance();

const VendorClient = require('./handleVendorClient');
const acmeVendor = new VendorClient('acme-widgets');
const flowersVendor = new VendorClient('1-800-flowers');

setInterval(() => {
  acmeVendor.newOrder({
    orderID: chance.guid,
    customer: chance.name(),
    address: chance.address(),
  });
  acmeVendor.publishDeliveries();
  acmeVendor.subscribeDeliveries();
}, 3000);

setInterval(() => {
  flowersVendor.newOrder({
    orderID: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  });
  flowersVendor.publishDeliveries();
  flowersVendor.subscribeDeliveries();

}, 3000);

