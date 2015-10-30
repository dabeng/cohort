'use strict';

var email = require('nodemailer'),
    User = require('../models/user.server.model');

module.exports = function(agenda) {
  agenda.define('sending fitness report to user', function(job) {
    console.log('Keep moving! ~~~~~~~~');
  });
  // More email related jobs
};