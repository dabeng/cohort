'use strict';

var http = require('http'),
  socketio = require('socket.io'),
  mongoose = require('mongoose'),
  ObjectId = mongoose.Types.ObjectId,
  MomThemeColor = mongoose.model('MomThemeColor');

module.exports = function(app) {
  var server = http.createServer(app);
  var io = socketio(server);

  var generateThemeColor = function() {
    var hue = parseInt(Math.random() * 360);
    var saturation = parseInt(Math.random() * 75 + 25) + '%';
    var lightness = parseInt(Math.random() * 35 + 40) + '%';
    return 'hsl(' + hue + ',' + saturation + ',' + lightness + ')' ;
  };

  var attendeeList = [];
  io.on('connection', function (socket) {
    var name = socket.handshake.query.name;
    var id = socket.handshake.query.id;
    var momId = socket.handshake.query.momId;
    var isNewAttendee = true;
    attendeeList.every(function(attendee, index) {
      if (attendee.name === name) {
        isNewAttendee = false;
        return false;
      } else {
        return true;
      }
    });
    if (isNewAttendee) {
      // check if current user loggined the current miutes of meeting before
      MomThemeColor.findOne( { 'attendee': new ObjectId(id), 'mom': new ObjectId(momId) } , function(err, mtc) {
        if (err) {
          return console.log(err);
        }
        if (mtc) {// if it's first time, we genetate a theme color automatically for him
          attendeeList.push({ 'name': name, 'id': id, 'themeColor': mtc._doc.themeColor });
          io.emit('attendee logined', { 'attendeeList': attendeeList });
        } else {
          var color = generateThemeColor();
          var momThemeColor = new MomThemeColor({
            'attendee': new ObjectId(id),
            'mom': new ObjectId(momId),
            'themeColor': color
          });
          momThemeColor.save(function(err) {
            if (err) {
              return console.log(err);
            }
            attendeeList.push({ 'name': name, 'id': id, 'themeColor': color });
            // emit all the attendees' info to client side because all the client side need to
            // know the full attendee list
            io.emit('attendee logined', { 'attendeeList': attendeeList });
          });
        }
      });
    }
    
    socket.on('disconnect', function() {
      var logoutAttendeeIndex = 0;
      attendeeList.some(function(attendee, index) {
        if (attendee.name === name) {
          logoutAttendeeIndex = index;
          return true;
        } else {
          return false;
        }
      });
      attendeeList.splice(logoutAttendeeIndex, 1);
      socket.broadcast.emit('attendee logouted', { 'attendeeName': name });
    });

  });

  return server;
};