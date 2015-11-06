'use strict';

var nodemailer = require('nodemailer'),
  hbs = require('nodemailer-express-handlebars'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Fitness = mongoose.model('Fitness'),
  ObjectId = mongoose.Types.ObjectId;

var getRealData = function(fitnesses) {
  var realPullups = 0, realSitups = 0, realRunnings = 0;
  fitnesses.forEach(function(fitness, index){
    realPullups += fitness.pullup;
    realSitups += fitness.situp;
    realRunnings += fitness.running;
  });
  return { 'pullups': realPullups, 'situps': realSitups, 'runnings': realRunnings };
};

var getBaseData = function(reportName, dayTasks) {
  var basePullups = 0, baseSitups = 0, baseRunnings = 0;
  if (reportName === 'Weekly') {
    basePullups = dayTasks.pullups * 7;
    baseSitups = dayTasks.situps * 7;
    baseRunnings = dayTasks.runnings * 7;
  } else {
    basePullups = dayTasks.pullups * 28;
    baseSitups = dayTasks.situps * 28;
    baseRunnings = dayTasks.runnings * 28;
  }

  return { 'pullups': basePullups, 'situps': baseSitups, 'runnings': baseRunnings };
};

var getOperators = function(reportName, realData, baseData) {
  var operators = {};
  var props = ['pullups', 'situps', 'runnings'];
  props.forEach(function(prop, index) {
    if (realData[prop] < baseData[prop]) {
      operators[prop] = '<';
    } else if (realData[prop] === baseData[prop]) {
      operators[prop] = '=';
    } else {
      operators[prop] = '>';
    }
  });

  return operators;
};

var getEvaluations = function(reportName, realData, baseData, dayTasks) {
  var bufferDays = 0;
  if (reportName === 'Weekly') {
    bufferDays = 2;
  } else {
    bufferDays = 8;
  }

  var props = ['pullups', 'situps', 'runnings'];
  var badScores = {}, goodScores = {};
  props.forEach(function(prop, index) {
    badScores[prop] = baseData[prop] - (dayTasks[prop] * bufferDays);
    goodScores[prop] = baseData[prop] + (dayTasks[prop] * bufferDays);
  });

  var evaluations = {};
  props.forEach(function(prop, index) {
    if(realData[prop] < badScores[prop]) {
      evaluations[prop] = { 'picture': 'bad@cohort', 'text': 'Dude, you let me down' };
    } else if (realData[prop] >= badScores[prop] && realData[prop] < baseData[prop]) {
      evaluations[prop] = { 'picture': 'notbad@cohort', 'text': 'Not bad, keep hard working' };
    } else if (realData[prop] >= baseData[prop] && realData[prop] < goodScores[prop]) {
      evaluations[prop] = { 'picture': 'good@cohort', 'text': 'Good! I\'m proud of you' };
    } else {
      evaluations[prop] = { 'picture': 'verygood@cohort', 'text': 'Awesome! You are the best' };
    }
  });

  return evaluations;
};

var sendEmail = function(reportName, user, fitnesses, done) {
  // create reusable transporter object using SMTP transport
  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails
  var transporter = nodemailer.createTransport({
    service: 'QQ',
    auth: {
      user: '422050402@qq.com',
      pass: '021219rd'
    }
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

  // build the datasource of report table 
  var realData = getRealData(fitnesses);
  var dayTasks = { 'pullups': 40, 'situps': 60, 'runnings': 5 };
  var baseData = getBaseData(reportName, dayTasks);
  var operators = getOperators(reportName, realData, baseData);
  var evaluations = getEvaluations(reportName, realData, baseData, dayTasks);

  var mailOptions = {
    from: '422050402@qq.com', // sender address
    to: user.email, // list of receivers
    subject: 'Fitness ' + reportName + ' Report from Cohort', // Subject line
    template: 'fitness-report',// email template
    context: {
      'reportName': reportName,
      'realData': realData,
      'operators': operators,
      'baseData': baseData,
      'evaluations': evaluations
    },
    attachments: [
      {
        filename: 'pullup.jpg',
        path: 'public/images/email/pullup.jpg',
        cid: 'pullup@cohort'
      }, {
        filename: 'situp.jpg',
        path: 'public/images/email/situp.jpg',
        cid: 'situp@cohort'
      }, {
        filename: 'running.jpg',
        path: 'public/images/email/running.jpg',
        cid: 'running@cohort'
      }, {
        filename: 'bad.gif',
        path: 'public/images/email/bad.gif',
        cid: 'bad@cohort'
      }, {
        filename: 'notbad.gif',
        path: 'public/images/email/notbad.gif',
        cid: 'notbad@cohort'
      }, {
        filename: 'good.gif',
        path: 'public/images/email/good.gif',
        cid: 'good@cohort'
      }, {
        filename: 'verygood.gif',
        path: 'public/images/email/verygood.gif',
        cid: 'verygood@cohort'
      }
    ]
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
      return console.log('Failed to retrive user info[' + err + ']');
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
            return console.log('Failed to retrive fitness info[' + err + ']');
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