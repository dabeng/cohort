'use strict';

// Configuring the Articles module
angular.module('moms').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Minutes of Meeting', 'moms', 'dropdown', '/moms(/create)?');
		Menus.addSubMenuItem('topbar', 'moms', 'List Moms', 'moms');
		Menus.addSubMenuItem('topbar', 'moms', 'New Mom', 'moms/create');
	}
]);