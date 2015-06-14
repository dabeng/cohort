'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'), Schema = mongoose.Schema;

/**
 * Attachment Schema
 */
var AttachmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  fileType: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  thumbImagePath: {
    type: String,
    trim: true
  },
  coverImagePath: {
    type: String,
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
  uploader: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  }
});

module.exports = mongoose.model('Attachment', AttachmentSchema);