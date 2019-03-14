var request = require('request');

// module.exports.get_raw_files = function(req, res) {
//     request.get({url: 'http://api:8080/api/files', json:true}, function (error, response, data)  {
//         if (error) {
//             throw error;
//         }
//
//         res.json(data);
//
//     });
// };


module.exports.put_raw_files = function (req, res) {
    res.sendStatus(200);
};


module.exports.send_update_signal = function (req, res) {
    // io.emit('messages', 'Hello from server');
    res.sendStatus(200)
};

module.exports.get_raw_table = function (req, res) {
    res.sendFile('/views/raw_table.html');
}