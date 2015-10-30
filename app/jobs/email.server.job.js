'use strict';

var nodemailer = require('nodemailer'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fitness = mongoose.model('Fitness'),
  ObjectId = mongoose.Types.ObjectId;

var sendEmail = function(user, fitnesses, done) {
  // create reusable transporter object using SMTP transport
  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'zhexiany@gmail.com',
      pass: '021219rd'
    }
  });

  var pullups = 0, situps = 0, runnings = 0;
  fitnesses.forEach(function(fitness, index){
    pullups += fitness.pullup;
    situps += fitness.situp;
    runnings += fitness.running;
  });
  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'cohort.net@gamil.com', // sender address
    to: user.email, // list of receivers
    subject: 'Fitness Weekly Report from Cohort', // Subject line
    html: '<p><b>pullups:</b>' + pullups + '</p>'
      + '<p><b>situps:</b>' + situps + '</p>'
      + '<p><b>runnings:</b>' + runnings + '</p>'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    done();
    if(error){
      return console.log(error);
    }
    console.log('Message sent: ' + info.response);
  });
};

var sendFitnessReport = function(period, done) {
  // firstly, retrive user info
  User.find({}, function(err, users) {
    if (err) {
      console.log('Failed to retrive user info[' + err + ']');
    }
    if (users.length){
      var userEmails = [];
      users.forEach(function(user, index){
        // userEmails.push(user.email);
        var oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - period);
        oneWeekAgo.setHours(0,0,0,0);// set to zero clock
        var today = new Date();// Monday
        today.setHours(0,0,0,0);
        // secondly, retrive the fitness info for this user
        Fitness.find({
          'exerciser': new ObjectId(user._id), 
          'fitnessDay': { '$gte': oneWeekAgo, '$lt': today }
        }, function(err, fitnesses) {
          if (err) {
            console.log('Failed to retrive fitness info[' + err + ']');
            process.exit(1);
          }
          if (fitnesses.length) {
            // now, we can send email of this report
            sendEmail(user, fitnesses, done);
          }
        });
      });
    }
  });
}

module.exports = function(agenda) {

  agenda.define('sending fitness weekly report', function(job, done) {
    sendFitnessReport(7, done);
  });

  agenda.define('sending fitness monthly report', function(job, done) {
    sendFitnessReport(30, done);
  });

  // More email related jobs

};