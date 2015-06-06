'use strict';

// Activities controller
angular.module('activities').controller('ListActivitiesCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Activities', 'Attachments',
  function($scope, $stateParams, $location, Authentication, Activities, Attachments) {
    $scope.authentication = Authentication;

    // Find a list of Activities
    $scope.find = function() {
      $scope.activities = Activities.query();
    };

  }
]);