'use strict';

var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    mongoose         = require('mongoose');



//constants

const PORT = 8080;
const HOST = '0.0.0.0';

// App

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/views/index.html');
  });

app.use('/js', express.static(__dirname + '/client/js'));


app.listen(PORT, HOST);
console.log(`running on http://${HOST}:${PORT}`);





