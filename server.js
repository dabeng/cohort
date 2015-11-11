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
io.on('connection', function (socket) {
  // io.emit('this', { will: 'be received by everyone'});
  socket.broadcast.emit('user connected', { hello: 'world' });

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