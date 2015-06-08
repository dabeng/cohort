'use strict';

//Setting up route
angular.module('cookbooks').config(['$stateProvider',
	function($stateProvider) {
		// Cookbooks state routing
		$stateProvider.
		state('listCookbooks', {
			url: '/cookbooks',
			templateUrl: 'modules/cookbooks/views/list-cookbooks.client.view.html'
		}).
		state('createCookbook', {
			url: '/cookbooks/create',
			templateUrl: 'modules/cookbooks/views/create-cookbook.client.view.html'
		}).
		state('viewCookbook', {
			url: '/cookbooks/:cookbookId',
			templateUrl: 'modules/cookbooks/views/view-cookbook.client.view.html'
		}).
		state('editCookbook', {
			url: '/cookbooks/:cookbookId/edit',
			templateUrl: 'modules/cookbooks/views/edit-cookbook.client.view.html'
		});
	}
]);