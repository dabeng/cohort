'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Cookbook = mongoose.model('Cookbook'),
	_ = require('lodash');

/**
 * Create a Cookbook
 */
exports.create = function(req, res) {
	var cookbook = new Cookbook(req.body);
	cookbook.user = req.user;

	cookbook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cookbook);
		}
	});
};

/**
 * Show the current Cookbook
 */
exports.read = function(req, res) {
	res.jsonp(req.cookbook);
};

/**
 * Update a Cookbook
 */
exports.update = function(req, res) {
	var cookbook = req.cookbook ;

	cookbook = _.extend(cookbook , req.body);

	cookbook.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cookbook);
		}
	});
};

/**
 * Delete an Cookbook
 */
exports.delete = function(req, res) {
	var cookbook = req.cookbook ;

	cookbook.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cookbook);
		}
	});
};

/**
 * List of Cookbooks
 */
exports.list = function(req, res) { 
	Cookbook.find().sort('-created').populate('user', 'displayName').exec(function(err, cookbooks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cookbooks);
		}
	});
};

/**
 * Cookbook middleware
 */
exports.cookbookByID = function(req, res, next, id) { 
	Cookbook.findById(id).populate('user', 'displayName').exec(function(err, cookbook) {
		if (err) return next(err);
		if (! cookbook) return next(new Error('Failed to load Cookbook ' + id));
		req.cookbook = cookbook ;
		next();
	});
};

/**
 * Cookbook authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cookbook.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
