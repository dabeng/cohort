'use strict';

// Activities controller
angular.module('activities').controller('EditActivityCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Activities', 'Attachments',
  function($scope, $stateParams, $location, Authentication, Activities, Attachments) {
    $scope.authentication = Authentication;

    // Update existing Activity
    $scope.update = function() {
      var activity = $scope.activity;

      activity.$update(function() {
        $location.path('activities/' + activity._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find existing Activity
    $scope.findOne = function() {
      $scope.activity = Activities.get({
        activityId: $stateParams.activityId
      });
      $scope.attachments = Attachments.query({
        activity: $stateParams.activityId
      });
    };

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

  }
]);