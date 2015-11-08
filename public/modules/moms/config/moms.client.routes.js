'use strict';

//Setting up route
angular.module('moms').config(['$stateProvider',
	function($stateProvider) {
		// Moms state routing
		$stateProvider.
		state('listMoms', {
			url: '/moms',
			templateUrl: 'modules/moms/views/list-moms.client.view.html'
		}).
		state('createMom', {
			url: '/moms/create',
			templateUrl: 'modules/moms/views/create-mom.client.view.html'
		}).
		state('viewMom', {
			url: '/moms/:momId',
			templateUrl: 'modules/moms/views/view-mom.client.view.html'
		}).
		state('editMom', {
			url: '/moms/:momId/edit',
			templateUrl: 'modules/moms/views/edit-mom.client.view.html'
		});
	}
]);