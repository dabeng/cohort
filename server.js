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

// var server = require('http').createServer(app);
// var io = require('socket.io')(server);

// var attendeeList = [];
// io.on('connection', function (socket) {
//   var attendee = socket.handshake.query.name;
//   if (attendeeList.indexOf(attendee) === -1) {
//   	attendeeList.push(attendee);
//   }
//   io.emit('attendee logined', { 'attendeeList': attendeeList });

//   socket.on('disconnect', function() {
//     var logoutAttendee = socket.handshake.query.name;
//     attendeeList.splice(attendeeList.indexOf(logoutAttendee), 1);
//     socket.broadcast.emit('attendee logouted', { 'attendeeName': logoutAttendee });
//   });

// });

var server = require('./app/sockets/mom')(app);

// Start the app by listening on <port>
// app.listen(config.port);
server.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);

// start up agenda jobs
require('./app/jobs/agenda.server')();