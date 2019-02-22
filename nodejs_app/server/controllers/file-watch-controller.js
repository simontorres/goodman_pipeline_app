RabbitMQConsumer = require('../rabbitmq-consumer'); //specify the name of the file here containing the code we just wrote

var configuration = {
    userName: "user",
    password: "pass",
    host: "rabbit",
    port: 5672,
    virtualHost: "rvhost",
    exchangeName: "exchange",
    exchangeType: "fanout",
    exchangeOptions: {
        durable: false,
        internal: false,
        autoDelete: true
    },
    queueName: "nodeapp",
    queueOptions: {
        exclusive: true,
        durable: true,
        autoDelete: false
    },
    routingKey: "routingkey"
};


module.exports.watch = function(req, res) {
    var consumer = new RabbitMQConsumer(configuration);
    consumer.on('received', function(messageText) {
        console.log('Message received:', messageText);
    });

    consumer.consume();
    res.json({'success': 'true'});
};

module.exports.list = function (req, res) {
    res.json([
        {'OBJECT': 'Focus sequence',
         'OBSTYPE': 'OBJECT',
         'RA': '22:25:11.471',
         'DEC': '22:30:37.003'},
        {'OBJECT': 'bias',
         'OBSTYPE': 'BIAS',
         'RA': '22:25:11.471',
         'DEC': '22:30:37.003'},
        {'OBJECT': 'Flat',
         'OBSTYPE': 'FLAT',
         'RA': '22:25:11.471',
         'DEC': '22:30:37.003'}

    ])
};