'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Fitness Schema
 */
var FitnessSchema = new Schema({
  fitnessDay: {
    type: Date,
    default: Date.now
  },
  pullup: {
    type: Number,
    default: 0
  },
  situp: {
    type: Number,
    default: 0
  },
  running: {
    type: Number,
    default: 0
  },
  exerciser: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User'
  }
});

mongoose.model('Fitness', FitnessSchema);