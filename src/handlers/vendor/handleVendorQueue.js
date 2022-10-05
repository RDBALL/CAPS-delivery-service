'use strict';

const MessageQueue = require('../../handleMessage/messageQueue');

class VendorQueue {
  constructor() {
    this.queues = {};
  }

  addQueue(storeId) {
    try {
      const newQueue = new MessageQueue();
      this.queues[storeId] = newQueue;
    } catch(error) {
      console.log(error);
    }
  }

  removeQueue(storeId) {
    try {
      delete this.queues[storeId];
      return `Delete Queue for client ${storeId}`;
    } catch(error) {
      console.log(error);
    }
  }
}

module.exports = VendorQueue;