'use strict';

const express = require('express');

var RabbitMQConsumer = require('./rabbitmq-consumer'); //specify the name of the file here containing the code we just wrote

var configuration = {
    userName: "user",
    password: "pass",
    host: "rabbit",
    port: 5672,
    virtualHost: "rvhost",
    exchangeName: "exchange",
    exchangeType: "direct",
    exchangeOptions: {
        durable: true,
        internal: false,
        autoDelete: true
    },
    queueName: "default",
    queueOptions: {
        exclusive: false,
        durable: false,
        autoDelete: true
    },
    routingKey: "routingkey"
};

//constants

const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World\n');
  });

var consumer = new RabbitMQConsumer(configuration);


app.get('/files', (req, res) => {
    consumer.on('received', function(messageText) {
        console.log('Message received:', messageText);
        });

    consumer.consume();
    });

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);





