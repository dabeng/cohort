'use strict';

// Moms controller
angular.module('moms').controller('MomsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Moms',
	function($scope, $stateParams, $location, Authentication, Moms) {
		$scope.authentication = Authentication;

		// Create new Mom
		$scope.create = function() {
			// Create new Mom object
			var mom = new Moms ({
				name: this.name
			});

			// Redirect after save
			mom.$save(function(response) {
				$location.path('moms/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Mom
		$scope.remove = function(mom) {
			if ( mom ) { 
				mom.$remove();

				for (var i in $scope.moms) {
					if ($scope.moms [i] === mom) {
						$scope.moms.splice(i, 1);
					}
				}
			} else {
				$scope.mom.$remove(function() {
					$location.path('moms');
				});
			}
		};

		// Update existing Mom
		$scope.update = function() {
			var mom = $scope.mom;

			mom.$update(function() {
				$location.path('moms/' + mom._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Moms
		$scope.find = function() {
			$scope.moms = Moms.query();
		};

		// Find existing Mom
		$scope.findOne = function() {
			$scope.mom = Moms.get({ 
				momId: $stateParams.momId
			});
		};
	}
]);