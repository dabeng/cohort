'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Activity name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  dateTime: {
    type: Date,
    default: Date.now,
    expires: 60*60*24
  },
  dest: {
    type: String,
    default: '',
    required: 'Please fill Activity destination',
    trim: true
  },
  route: {
    type: String,
    default: '',
    trim: true
  }
});

mongoose.model('Activity', ActivitySchema);