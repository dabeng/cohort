'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mom = mongoose.model('Mom'),
	_ = require('lodash');

/**
 * Create a Mom
 */
exports.create = function(req, res) {
	var mom = new Mom(req.body);
	mom.user = req.user;

	mom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mom);
		}
	});
};

/**
 * Show the current Mom
 */
exports.read = function(req, res) {
	res.jsonp(req.mom);
};

/**
 * Update a Mom
 */
exports.update = function(req, res) {
	var mom = req.mom ;

	mom = _.extend(mom , req.body);

	mom.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mom);
		}
	});
};

/**
 * Delete an Mom
 */
exports.delete = function(req, res) {
	var mom = req.mom ;

	mom.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mom);
		}
	});
};

/**
 * List of Moms
 */
exports.list = function(req, res) { 
	Mom.find().sort('-created').populate('user', 'displayName').exec(function(err, moms) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(moms);
		}
	});
};

/**
 * Mom middleware
 */
exports.momByID = function(req, res, next, id) { 
	Mom.findById(id).populate('user', 'displayName').exec(function(err, mom) {
		if (err) return next(err);
		if (! mom) return next(new Error('Failed to load Mom ' + id));
		req.mom = mom ;
		next();
	});
};

/**
 * Mom authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mom.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
