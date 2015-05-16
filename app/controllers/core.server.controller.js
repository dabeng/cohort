'use strict';

/**
 * Module dependencies.
 */

var moment = require('moment');
var utils = require('./utils.server.controller');
var Activity = require('../models/activity.server.model');
var Attachment = require('../models/attachment.server.model');
var User = require('../models/user.server.model');

exports.index = function(req, res) {
  res.render('index', {
    user: req.user || null,
    request: req
  });
};