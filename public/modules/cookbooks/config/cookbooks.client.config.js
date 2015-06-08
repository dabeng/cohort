'use strict';

// Configuring the Articles module
angular.module('cookbooks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cookbooks', 'cookbooks', 'dropdown', '/cookbooks(/create)?');
		Menus.addSubMenuItem('topbar', 'cookbooks', 'List Cookbooks', 'cookbooks');
		Menus.addSubMenuItem('topbar', 'cookbooks', 'New Cookbook', 'cookbooks/create');
	}
]);