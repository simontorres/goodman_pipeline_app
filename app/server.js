'use strict';

var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    fileController   = require('./server/controllers/file-watch-controller'),
    monk             = require('monk');



//constants

const PORT = 8080;
const HOST = '0.0.0.0';

var db = monk('db:27017/testdb');

app.use(function (req, res, next) {
    req.db = db;
    next();
});

// App

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/views/index.html');
  });

app.use('/js', express.static(__dirname + '/client/js'));

app.get('/api/files', fileController.list);
// app.get('/api/files', fileController.watch);
app.post('/api/files', fileController.watch);

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);





