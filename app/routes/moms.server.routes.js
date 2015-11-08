'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var moms = require('../../app/controllers/moms.server.controller');

	// Moms Routes
	app.route('/moms')
		.get(moms.list)
		.post(users.requiresLogin, moms.create);

	app.route('/moms/:momId')
		.get(moms.read)
		.put(users.requiresLogin, moms.hasAuthorization, moms.update)
		.delete(users.requiresLogin, moms.hasAuthorization, moms.delete);

	// Finish by binding the Mom middleware
	app.param('momId', moms.momByID);
};
