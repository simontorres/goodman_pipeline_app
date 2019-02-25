"use strict";

var amqp = require('amqplib');
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var priv = new Map();

function RabbitMQConsumer(opts) {
    priv.set(this, opts);

}

util.inherits(RabbitMQConsumer, EventEmitter);

RabbitMQConsumer.prototype.consume = function() {
    var self = this;
    var config = priv.get(this);
    var uri = "amqp://" + config.userName + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.virtualHost;
    console.log(uri);

    var openConnection = function() {
        amqp.connect(encodeURI(uri)).then(function (conn) {
            process.once('SIGINT', function() {
                conn.close();
            });

            conn.on('error', function(err) {
                console.warn(err.message);
                openConnection();
                });

            conn.createChannel()
                .then(function(ch) {
                    ch.assertExchange(config.exchangeName, config.exchangeType, config.exchangeOptions)
                        .then(function() {
                            return ch.assertQueue(config.queueName, config.queueOptions);
                            })
                            .then(function(queueData) {
                                ch.bindQueue(queueData.queue, config.exchangeName, config.routingKey);
                                return queueData.queue
                                })
                                .then(function (queueName) {
                                    ch.consume(queueName, consumeMessage);
                                });
                    function consumeMessage(msg) {
                        self.emit("received", msg.content.toString());
                        ch.ack(msg);
                    }
                });
        }).catch(console.warn);
    };
    openConnection();
};

module.exports = RabbitMQConsumer;