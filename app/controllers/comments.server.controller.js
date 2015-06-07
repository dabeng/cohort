'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Comment = mongoose.model('Comment'),
  _ = require('lodash'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create a Comment
 */
exports.create = function(req, res) {
  var comment = new Comment(req.body);
  comment.activity = new ObjectId(req.body.activity);
  comment.commenter = req.user;

  comment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * Show the current comment
 */
exports.read = function(req, res) {
  res.jsonp(req.comment);
};

/**
 * Update a comment
 */
exports.update = function(req, res) {
  var comment = req.comment ;

  comment = _.extend(comment , req.body);

  comment.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * Delete an comment
 */
exports.delete = function(req, res) {
  var comment = req.comment;

  comment.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(comment);
    }
  });
};

/**
 * List of comments
 */
exports.list = function(req, res) {
  if (req.query.activity) {
    req.query.activity = new ObjectId(req.query.activity);
  }
  Comment.find( req.query || {}).populate('commenter', 'displayName').exec(function(err, comments) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(comments);
    }
  });
};

/**
 * comment middleware
 */
exports.commentByID = function(req, res, next, id) {
  Comment.findById(id).populate('commenter', 'displayName').exec(function(err, comment) {
    if (err) return next(err);
    if (! comment) return next(new Error('Failed to load comment ' + id));
    req.comment = comment;
    next();
  });
};

/**
 * comment authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.comment.user.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
