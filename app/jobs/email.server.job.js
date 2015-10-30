'use strict';

var nodemailer = require('nodemailer'),
  mongoose = require('mongoose'),
  User = mongoose.model('User');

module.exports = function(agenda) {

  agenda.define('sending fitness weekly report', function(job, done) {
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'zhexiany@gmail.com',
        pass: '021219rd'
      }
    });

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    User.find({}, function(err, docs) {
      if (!err){
        var userEmails = [];
        docs.forEach(function(user, index){
          userEmails.push(user.email);
        });
      
        // setup e-mail data with unicode symbols
        var mailOptions = {
          from: 'cohort.net@gamil.com', // sender address
          to: userEmails.join(), // list of receivers
          subject: 'Fitness Weekly Report from Cohort', // Subject line
          text: 'Hello world', // plaintext body
          html: '<b>Hello world ✔</b>' // html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info){
          done();
          if(error){
            return console.log(error);
          }
          console.log('Message sent: ' + info.response);
        });
      } else {
        console.log('Failed to retrive user info[' + err + ']');
      }
    });

  });

  // More email related jobs

};