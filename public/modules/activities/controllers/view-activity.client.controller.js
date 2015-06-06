'use strict';

// Activities controller
angular.module('activities').controller('ViewActivityCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Activities','Attachments',
  function($scope, $stateParams, $location, Authentication, Activities, Attachments) {
    $scope.authentication = Authentication;

    $scope.currentAttach = "";
    $scope.attachCollapsed = true;

    // Find existing Activity
    $scope.findOne = function() {
      $scope.activity = Activities.get({
        activityId: $stateParams.activityId
      });
      $scope.attachments = Attachments.query({
        activity: $stateParams.activityId
      });
    };

    // Remove existing Activity
    $scope.remove = function(activity) {
      if ( activity ) {
        activity.$remove();

        for (var i in $scope.activities) {
          if ($scope.activities [i] === activity) {
            $scope.activities.splice(i, 1);
          }
        }
      } else {
        $scope.activity.$remove(function() {
          $location.path('activities');
        });
      }
    };

    $scope.playAttachment = function($event) {
      $scope.attachCollapsed = false;
      $scope.currentAttach = $event.target.src.replace(/thumb./, 'std.');
    };

  }
]);