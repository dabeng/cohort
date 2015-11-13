'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * MomThemeColor Schema
 */
var MomThemeColorSchema = new Schema({
  attendee: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  mom: {
    type: Schema.ObjectId,
    ref: 'Mom'
  },
  themeColor: {
    type: String,
    required: 'Please fill theme color',
    trim: true
  }
});

mongoose.model('MomThemeColor', MomThemeColorSchema);