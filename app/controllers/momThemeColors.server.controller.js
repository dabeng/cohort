'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  MomThemeColor = mongoose.model('MomThemeColor'),
  _ = require('lodash');

/**
 * Create a Mom
 */
exports.create = function(req, res) {
  var momThemeColor = new MomThemeColor(req.body);
  momThemeColor.attendee = req.user;

  momThemeColor.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(momThemeColor);
    }
  });
};

/**
 * Show the current Mom
 */
exports.read = function(req, res) {
  res.jsonp(req.momThemeColor);
};

/**
 * Update a Mom
 */
exports.update = function(req, res) {
  var momThemeColor = req.momThemeColor ;

  momThemeColor = _.extend(momThemeColor , req.body);

  momThemeColor.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(momThemeColor);
    }
  });
};

/**
 * Delete an Mom
 */
exports.delete = function(req, res) {
  var momThemeColor = req.momThemeColor ;

  momThemeColor.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(momThemeColor);
    }
  });
};

/**
 * List of Mom Theme Colors
 */
exports.list = function(req, res) { 
  MomThemeColor.find().sort('-created').populate('user', 'displayName').exec(function(err, momThemeColors) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(momThemeColors);
    }
  });
};

/**
 * Mom Theme Color middleware
 */
exports.momThemeColorByID = function(req, res, next, id) { 
  MomThemeColor.findById(id).populate('user', 'displayName').exec(function(err, momThemeColor) {
    if (err) return next(err);
    if (! momThemeColor) return next(new Error('Failed to load mom theme color' + id));
    req.momThemeColor = momThemeColor ;
    next();
  });
};

/**
 * Mom Theme Color authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.momThemeColor.attendee.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
