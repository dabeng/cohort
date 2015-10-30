'use strict';

var nodemailer = require('nodemailer'),
  User = require('../models/user.server.model');

module.exports = function(agenda) {
  agenda.define('sending fitness report to user', function(job, done) {
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

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'cohort.net@gamil.com', // sender address
        to: 'xinguan413@163.com', // list of receivers
        subject: 'Fitness Weekly Report', // Subject line
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

  });

  // More email related jobs

};