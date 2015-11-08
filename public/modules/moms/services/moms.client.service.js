'use strict';

//Moms service used to communicate Moms REST endpoints
angular.module('moms').factory('Moms', ['$resource',
	function($resource) {
		return $resource('moms/:momId', { momId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);