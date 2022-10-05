'use strict';

const Chance = require('chance');
const chance = new Chance();

class MessageQueue {
  constructor() {
    this.messages = {};
  }

  add(queueId, payload) {
    let messageId = chance.guid();

    try {
      if(this.messages[queueId]) {
        this.messages[queueId][messageId] = payload;
      } else {
        this.messages[queueId] = { [messageId]: payload };
      }
      return messageId;
    } catch(e) {
      console.log(e);
      throw new Error('Add message error', e);
    }
  }

  get(queueId) {
    try {
      return Object.keys(this.messages[queueId]).map(messageId => ({
        messageId: messageId,
        payload: this.messages[queueId][messageId],
      }));
    } catch(e) {
      console.log(e);
      throw new Error('Queue get error', e);
    }
  }

  read(queueId, messageId) {
    try {
      if(this.messages[queueId]) {
        delete this.messages[queueId][messageId];
        return ({
          status: 'received',
          messageId,
        });
      } else {
        throw new Error('Error reading message');
      }
    } catch(e) {
      console.log(e);
    }
  }
}

module.exports = MessageQueue;