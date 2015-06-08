'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Cookbook Schema
 */
var CookbookSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Cookbook name',
		trim: true
	},
	picture: {
    type: String,
    trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Cookbook', CookbookSchema);