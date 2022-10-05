'use strict';

const messageClient = require('../../handleMessage/messageClient');

const messages = new messageClient('id');

messages.subscribe('received', payload => {
  console.log(payload);
});

messages.publish('message', {
  test: 'hello from sender!!',
});