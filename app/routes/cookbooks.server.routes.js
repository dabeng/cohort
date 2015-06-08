'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cookbooks = require('../../app/controllers/cookbooks.server.controller');

	// Cookbooks Routes
	app.route('/cookbooks')
		.get(cookbooks.list)
		.post(users.requiresLogin, cookbooks.create);

	app.route('/cookbooks/:cookbookId')
		.get(cookbooks.read)
		.put(users.requiresLogin, cookbooks.hasAuthorization, cookbooks.update)
		.delete(users.requiresLogin, cookbooks.hasAuthorization, cookbooks.delete);

	// Finish by binding the Cookbook middleware
	app.param('cookbookId', cookbooks.cookbookByID);
};
