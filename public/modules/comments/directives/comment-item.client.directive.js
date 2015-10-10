'use strict';

angular.module('comments').directive('commentitem', function() {
  return {
    restrict: 'E',
    scope: {
      comment: '=datasource'
    },
    templateUrl: 'modules/comments/views/comment-item.html',
    controller: function($scope, Comments) {
      // var param = {};
      // if ($scope.activityId) {
      //   param.activity = $scope.activityId;
      // }
      // if ($scope.attachmentId) {
      //   param.attachment = $scope.attachmentId;
      // }
      // $scope.comments = Comments.query(param);

      // $scope.$on('newcomment', function(event, newComment) {
      //   if (event.currentScope.activityId) {
      //     $scope.datasource.push(newComment);
      //   }
      // });
    }
  }
});