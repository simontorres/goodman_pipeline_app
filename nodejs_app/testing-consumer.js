var RabbitMQConsumer = require('./server/rabbitmq-consumer'); //specify the name of the file here containing the code we just wrote

var configuration = {
    userName: "user",
    password: "abc123",
    host: "rabbitmq.mydomain.com",
    port: 5671,
    virtualHost: "home",
    exchangeName: "home_exchange",
    exchangeType: "topic",
    exchangeOptions: {
        durable: true,
        internal: false,
        autoDelete: false
    },
    queueName: "roku_remote_queue",
    queueOptions: {
        exclusive: false,
        durable: true,
        autoDelete: false
    },
    routingKey: "home.remote.roku"
};

var consumer = new RabbitMQConsumer(configuration);

consumer.on('received', function(messageText) {
    console.log('Message received:', messageText);
});

consumer.consume();