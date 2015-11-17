'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Mom Schema
 */
var MomSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill MOM name',
    trim: true
  },
  boardContent: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Mom', MomSchema);