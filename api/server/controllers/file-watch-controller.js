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


// module.exports.watch = function(req, res) {
//     var consumer = new RabbitMQConsumer(configuration);
//     consumer.on('received', function(messageText) {
//         console.log('Message received:', messageText);
//     });
//
//     consumer.consume();
//     res.json({'success': 'true'});
// };

module.exports.add_raw = function(req, res) {
    var data = req.body;
    console.log(data);

    var db = req.db;
    var collection = db.get('raw_files');

    collection.insert(data);
    res.sendStatus(200);
};

module.exports.list_raw = function (req, res) {
    var db = req.db;
    var collection = db.get('raw_files');
    collection.find({}, {}, function (e, docs){
        res.json(docs);
    });
};