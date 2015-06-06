'use strict';

// Activities controller
angular.module('activities').controller('CreateActivityCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Activities',
  function($scope, $stateParams, $location, Authentication, Activities) {
    $scope.authentication = Authentication;

    $scope.category = 'party';
    $scope.dateTime = new Date();

    // Create new Activity
    $scope.create = function() {
      // Create new Activity object
      var activity = new Activities ({
        name: this.name,
        category: this.category,
        dateTime: this.dateTime,
        dest: this.dest,
        route: this.route
      });

      // Redirect after save
      activity.$save(function(response) {
        $location.path('activities/' + response._id);

        // Clear form fields
        $scope.name = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

  }
]);