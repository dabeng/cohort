'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  errorHandler = require('./errors.server.controller'),
  Fitness = mongoose.model('Fitness'),
  _ = require('lodash'),
  ObjectId = mongoose.Types.ObjectId;

/**
 * Create a Fitness
 */
exports.create = function(req, res) {
  var fitness = new Fitness(req.body);
  fitness.exerciser = req.user;

  fitness.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fitness);
    }
  });
};

/**
 * Show the current Fitness
 */
exports.read = function(req, res) {
  res.jsonp(req.fitness);
};

/**
 * Update a Fitness
 */
exports.update = function(req, res) {
  var fitness = req.fitness ;

  fitness = _.extend(fitness , req.body);

  fitness.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fitness);
    }
  });
};

/**
 * Delete an Fitness
 */
exports.delete = function(req, res) {
  var fitness = req.fitness ;

  fitness.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(fitness);
    }
  });
};

/**
 * List of Fitnesses
 */
exports.list = function(req, res) {
  if (req.query.exerciser) {
    req.query.exerciser = new ObjectId(req.query.exerciser);
  }
  Fitness.find(req.query || {}).sort('fitnessDay').populate('user', 'displayName').exec(function(err, fitnesses) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var aFitnesses = [];
      fitnesses.forEach(function(item, index) {
        aFitnesses.push([
          item._doc.fitnessDay,
          item._doc.pullup,
          item._doc.situp,
          item._doc.running
        ]);
      });
      res.send(aFitnesses);
    }
  });
};

/**
 * Fitness middleware
 */
exports.fitnessByID = function(req, res, next, id) { 
  Fitness.findById(id).populate('user', 'displayName').exec(function(err, fitness) {
    if (err) return next(err);
    if (! fitness) return next(new Error('Failed to load Fitness ' + id));
    req.fitness = fitness ;
    next();
  });
};

/**
 * Cookbook authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
  if (req.fitness.exerciser.id !== req.user.id) {
    return res.status(403).send('User is not authorized');
  }
  next();
};
