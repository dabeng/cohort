'use strict';

var nodemailer = require('nodemailer'),
  hbs = require('nodemailer-express-handlebars'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fitness = mongoose.model('Fitness'),
  ObjectId = mongoose.Types.ObjectId;

var sendEmail = function(reportName, user, fitnesses, done) {
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

  var handlebarsOptions = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: 'app/views/email/',
      defaultLayout : 'main',
      partialsDir : 'app/views/email/partials/'
    },
    viewPath: 'app/views/email/',// path to the directory where email template is
    extName: '.hbs'
   };
  //attach the plugin to the nodemailer transporter
  transporter.use('compile', hbs(handlebarsOptions));

  // setup e-mail data with unicode symbols
  var mailOptions = {
    from: 'cohort.net@gamil.com', // sender address
    to: user.email, // list of receivers
    subject: 'Fitness ' + reportName + ' Report from Cohort', // Subject line
    template: 'fitness-report',// email template
    context: {
      'reportName': reportName,
      'pullups': pullups,
      'situps': situps,
      'runnings': runnings 
    }
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
      users.forEach(function(user, index){
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
          }
          if (fitnesses.length) {
            // now, we can send email of this report
            var reportName = '';
            if (period === 7) {
              reportName = 'Weekly';
            } else {
              reportName = 'Monthly';
            }
            sendEmail(reportName, user, fitnesses, done);
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

  agenda.define('testing job', function(job) {
    console.log('~~~~OK~~~~');
  });

  // More email related jobs

};