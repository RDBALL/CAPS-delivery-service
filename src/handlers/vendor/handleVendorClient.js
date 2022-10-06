'use strict';

const Chance = require('chance');
const chance = Chance();
const Client = require('../../handleMessage/messageClient');

class VendorClient extends Client {
  constructor(vendorId) {
    super(vendorId);
    this.vendorId = vendorId;
  }

  newOrder(payload) {
    super.publish('PICKUP', {
      ...payload,
      messageId: chance.guid(),
      store: this.vendorId,
    });
  }

  publishDeliveries() {
    super.publish('get-all', { eventName: 'DELIVERED', queueId: this.vendorId });
  }

  subscribeDeliveries() {
    super.subscribe('DELIVERED', (payload) => {
      console.log(`VENDOR: thank you ${payload.customer} your order with id: ${payload.messageId} has been delivered`);
      super.publish('received', payload);
    });
  }
}

module.exports = VendorClient;