'use strict';

// Activities controller
angular.module('activities').controller('ViewActivityCtrl',
  ['$scope', '$stateParams', '$location', 'Authentication', 'Activities','Attachments', 'Comments',
  function($scope, $stateParams, $location, Authentication, Activities, Attachments, Comments) {
    $scope.authentication = Authentication;

    $scope.currentAttach = "";
    $scope.attachCollapsed = true;

    $scope.activity = Activities.get({
      activityId: $stateParams.activityId
    });
    $scope.activityId = $stateParams.activityId;

    $scope.attachments = Attachments.query({
      activity: $stateParams.activityId
    });

    $scope.comments = Comments.query({
      activity: $stateParams.activityId
    });

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

    $scope.$on('newComment', function(e, data) {
      data.commenter = $scope.authentication.user;
      $scope.comments.push(data);
    });

    $scope.$on('newAttachment', function(e, data) {
      data.uploader = $scope.authentication.user;
      $scope.attachments.push(data);
    });

  }
]);