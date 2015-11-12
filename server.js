'use strict';
/**
 * Module dependencies.
 */
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk'),
	http = require('http');


/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

// Init the express application
var app = require('./config/express')(db);

// Bootstrap passport config
require('./config/passport')();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
// io.use(function(socket, next) {
//   // var handshakeData = socket.request;
//   // console.log("middleware1:", socket.request._query['foo']);
//   // console.log("middleware2:", socket.handshake.query.foo);
//   socket.broadcast.emit('user connected', { hello: socket.handshake.query.foo });
//   next();
// });
var attendeeList = [];
io.on('connection', function (socket) {
  // io.emit('this', { will: 'be received by everyone'});
  var attendee = socket.handshake.query.name;
  if (attendeeList.indexOf(attendee) === -1) {
  	attendeeList.push(attendee);
  }
  io.emit('attendee logined', { 'attendeeList': attendeeList });

    socket.on('disconnect', function() {
      var logoutAttendee = socket.handshake.query.name;
      attendeeList.splice(attendeeList.indexOf(logoutAttendee), 1);
      socket.broadcast.emit('attendee logouted', { 'attendeeName': logoutAttendee });
    });

  // socket.on('private message', function (from, msg) {
  //   console.log('I received a private message by ', from, ' saying ', msg);
  // });

  // socket.on('disconnect', function () {
  //   io.emit('user disconnected');
  // });
});

// Start the app by listening on <port>
// app.listen(config.port);
server.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

// start up agenda jobs
require('./app/jobs/agenda.server')();