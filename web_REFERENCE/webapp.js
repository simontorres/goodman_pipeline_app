'use strict';

var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    api_controller   = require('./api/controllers/api_controller'),
    server           = require('http').createServer(app),
    io               = require('socket.io')(server),
    morgan           = require('morgan'),
    mongoose         = require('mongoose'),
    passport         = require('passport'),
    config           = require('./api/config/database');



mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird')})
    .then(() => console.log('Connection successful'))
    .catch((err) => console.error(err));

//constants
const PORT = 8080;

const HOST = '0.0.0.0';


var api = require('./api/routes/index');
app.use(passport.initialize());

app.use('/api', api);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });
//
// // error handlers
//
// // [SH] Catch unauthorised errors
// app.use(function (err, req, res, next) {
//   if (err.name === 'UnauthorizedError') {
//     res.status(401);
//     res.json({"message" : err.name + ": " + err.message});
//   }
// });
//
// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('error', {
//             message: err.message,
//             error: err
//         });
//     });
// }
//
// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });


app.use('/js', express.static(__dirname + '/client/js'));
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/css', express.static(__dirname + '/client/css'));


// App

// app.get('/', (req, res) => {
//     console.log(__dirname);
//     res.sendFile(__dirname + '/client/views/index.html');
//   });
//
// app.get('/admin', (req, res) => {
//     res.sendFile(__dirname + '/client/views/admin.html');
// });

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/client/views/signup.html');
});

// app.get('/raw_table', (req, res) => {
//     res.sendFile(__dirname + '/client/views/raw_table.html');
// });

// API routes

// app.get('/api/rawdata', api_controller.get_raw_files);
// app.put('/api/rawdata', api_controller.put_raw_files);
//
// app.post('/api/update', api_controller.send_update_signal);


server.listen(PORT, HOST);
console.log(`running webapp on http://${HOST}:${PORT}`);





