#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://ksyun:1qaz@WSX@10.0.5.156', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'frontend.info';

    ch.assertQueue(q, {durable: true});
    ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
      var secs = msg.content.toString().split('.').length - 1;

      // console.log(" [x] Received %s", msg.content.toString());

      // handle message
      try{
        console.log(JSON.parse(msg.content.toString()));
      }catch(e){
        console.log(e.name + ": " + e.message);
      }
      var msgContent = JSON.parse(msg.content.toString());
      
      var vm_id = msgContent.payload.instance_id,
          vm_state = msgContent.payload.state,
          timestamp = msgContent.timestamp;

      console.log("vm %s : state is : %s at %s", vm_id, vm_state, timestamp);

      setTimeout(function() {
        console.log(" [x] Done");
        ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false});
  });
});