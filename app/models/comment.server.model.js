'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  dateTime: {
    type: Date,
    default: Date.now,
    expires: 60*60*24
  },
  activity: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Activity'
  },
  commenter: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Comment', CommentSchema);