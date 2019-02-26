'use strict';

var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    api_controller   = require('./api/controllers/api_controller'),
    server           = require('http').createServer(app),
    io               = require('socket.io')(server);



//constants

const PORT = 8080;
const HOST = '0.0.0.0';

// App

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/views/index.html');
  });

app.use('/js', express.static(__dirname + '/client/js'));

// API routes

app.get('/api/rawdata', api_controller.get_raw_files);
app.put('/api/rawdata', api_controller.put_raw_files);

app.post('/api/update', api_controller.send_update_signal);


server.listen(PORT, HOST);
console.log(`running webapp on http://${HOST}:${PORT}`);





