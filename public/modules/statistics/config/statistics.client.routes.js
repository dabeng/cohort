'use strict';

//Setting up route
angular.module('statistics').config(['$stateProvider',
	function($stateProvider) {
		// Statistics state routing
		$stateProvider.
		state('charts', {
			url: '/statistics/charts',
			templateUrl: 'modules/statistics/views/charts.client.view.html'
		}).
    state('fitness', {
      url: '/statistics/fitness',
      templateUrl: 'modules/statistics/views/fitness.client.view.html'
    }).
    state('map', {
      url: '/statistics/map',
      templateUrl: 'modules/statistics/views/map.client.view.html'
    });
	}
]);