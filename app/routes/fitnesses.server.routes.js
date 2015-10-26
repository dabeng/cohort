'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var fitnesses = require('../../app/controllers/fitnesses.server.controller');

	// Fotnesses Routes
	app.route('/fitnesses')
		.get(fitnesses.list)
		.post(users.requiresLogin, fitnesses.create);

	app.route('/fitnesses/:fitnessId')
		.get(fitnesses.read)
		.put(users.requiresLogin, fitnesses.hasAuthorization, fitnesses.update)
		.delete(users.requiresLogin, fitnesses.hasAuthorization, fitnesses.delete);

	// Finish by binding the Fitness middleware
	app.param('fitnessId', fitnesses.fitnessByID);
};
