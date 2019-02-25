'use strict';

var express          = require('express'),
    cors             = require('cors'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose'),
    fileController   = require('./server/controllers/file-watch-controller'),
    monk             = require('monk');



//constants

const PORT = 8080;
const HOST = '0.0.0.0';

const corsOptions = {
    origin: '*'
};

var db = monk('db:27017/file_records');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    req.db = db;
    next();
});

// API routes

app.get('/api/files', cors(corsOptions), fileController.list_raw);
// app.get('/api/files', fileController.watch);
app.post('/api/files', cors(corsOptions), fileController.add_raw);

app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);





