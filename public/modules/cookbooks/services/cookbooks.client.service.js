'use strict';

//Cookbooks service used to communicate Cookbooks REST endpoints
angular.module('cookbooks').factory('Cookbooks', ['$resource',
	function($resource) {
		return $resource('cookbooks/:cookbookId', { cookbookId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);