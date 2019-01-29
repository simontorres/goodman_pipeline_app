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
    var config = priv.get(this);
    var uri = "amqps://" + config.userName + ":" + config.password + "@" + config.host + ":" + config.port + "/" + config.virtualHost;

    var openConnection = function() {
        amqp.connect(encondeURI(uri)).then(function (conn) {
            process.once('SIGINT', function() {
                conn.close();
            });
        }).catch(console.warn);

    };
};

module.exports = RabbitMQConsumer;