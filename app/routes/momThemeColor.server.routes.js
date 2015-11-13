'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var momThemeColors = require('../../app/controllers/momThemeColors.server.controller');

	// MomThemeColors Routes
	app.route('/momThemeColors')
		.get(momThemeColors.list)
		.post(users.requiresLogin, momThemeColors.create);

	app.route('/momThemeColors/:momThemeColorId')
		.get(momThemeColors.read)
		.put(users.requiresLogin, momThemeColors.hasAuthorization, momThemeColors.update)
		.delete(users.requiresLogin, momThemeColors.hasAuthorization, momThemeColors.delete);

	// Finish by binding the Mom middleware
	app.param('momThemeColorId', momThemeColors.momThemeColorByID);
};
