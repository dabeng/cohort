'use strict';

// Cookbooks controller
angular.module('cookbooks').controller('CookbooksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cookbooks',
	function($scope, $stateParams, $location, Authentication, Cookbooks) {
		$scope.authentication = Authentication;

		// Create new Cookbook
		$scope.create = function() {
			// Create new Cookbook object
			var cookbook = new Cookbooks ({
				name: this.name,
				picture: this.picture
			});

			// Redirect after save
			cookbook.$save(function(response) {
				$location.path('cookbooks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cookbook
		$scope.remove = function(cookbook) {
			if ( cookbook ) { 
				cookbook.$remove();

				for (var i in $scope.cookbooks) {
					if ($scope.cookbooks [i] === cookbook) {
						$scope.cookbooks.splice(i, 1);
					}
				}
			} else {
				$scope.cookbook.$remove(function() {
					$location.path('cookbooks');
				});
			}
		};

		// Update existing Cookbook
		$scope.update = function() {
			var cookbook = $scope.cookbook;

			cookbook.$update(function() {
				$location.path('cookbooks/' + cookbook._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cookbooks
		$scope.find = function() {
			$scope.cookbooks = Cookbooks.query();
		};

		// Find existing Cookbook
		$scope.findOne = function() {
			$scope.cookbook = Cookbooks.get({ 
				cookbookId: $stateParams.cookbookId
			});
		};
	}
]);