#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://ksyun:ksyun@10.146.16.60', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'cychai';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer('success! by chaichunyan'));
    console.log(" [x] Sent 'success! by chaichunyan'");
  });
  setTimeout(function() { conn.close(); process.exit(0) }, 500);
});
