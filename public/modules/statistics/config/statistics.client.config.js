'use strict';

// Statistics module config
angular.module('statistics').run(['Menus',
	function(Menus) {
    Menus.addMenuItem('topbar', 'Statistics', 'statistics', 'dropdown', '/statistics(/charts)?');
    Menus.addSubMenuItem('topbar', 'statistics', 'charts', 'statistics/charts');
    Menus.addSubMenuItem('topbar', 'statistics', 'datatables', 'statistics/datatables');
    Menus.addSubMenuItem('topbar', 'statistics', 'map', 'statistics/map');
	}
]);