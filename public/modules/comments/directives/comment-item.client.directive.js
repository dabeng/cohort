'use strict';

angular.module('comments').directive('commentitem', function() {
  return {
    restrict: 'E',
    scope: {
      activityId: '@',
      attachmentId: '@'
    },
    templateUrl: 'modules/comments/views/comment-item.html',
    controller: function($scope, Comments) {
      var param = {};
      if ($scope.activityId) {
        param.activity = $scope.activityId;
      }
      if ($scope.attachmentId) {
        param.attachment = $scope.attachmentId;
      }
      $scope.datasource = Comments.query(param);

      $scope.$on('newcomment', function(e, newComment) {
        $scope.datasource.push(newComment);
      });
    }
  }
});