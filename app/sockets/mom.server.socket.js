'use strict';

var http = require('http');
var socketio = require('socket.io')

module.exports = function(app) {
  var server = http.createServer(app);
  var io = socketio(server);

  var attendeeList = [];
  io.on('connection', function (socket) {
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

  });

  return server;
};