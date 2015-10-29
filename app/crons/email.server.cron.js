'use strict';

var email = require('nodemailer'),
    User = require('../models/user-model.js');

module.exports = function(agenda) {
  agenda.define('sending fitness report to user', function(job) {
    console.log('Keep moving! ~~~~~~~~');
  });

  agenda.every('1 minutes', 'sending fitness report to user');

}