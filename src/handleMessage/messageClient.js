//from in-class demo

'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const SOCKET_URL = process.env.SOCKET_URL || 'http://localhost:3002/caps';

class MessageClient {
  constructor(queueId) {
    this.queueId = queueId;
    this.socket = io(SOCKET_URL);
    this.socket.emit('join',  queueId );
    this.socket.on('join', (id) => console.log('Joined queue with id:\n ', id));
  }

  publish(event, payload) {
    this.socket.emit(event, { ...payload, eventName: event, queueId: this.queueId });
  }

  subscribe(event, callback) {
    this.socket.on(event, callback);
  }
}

module.exports = MessageClient;