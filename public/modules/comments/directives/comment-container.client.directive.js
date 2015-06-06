'use strict';

angular.module('comments').directive('commentcontainer', function() {
  return {
    restrict: 'E',
    scope: {
      datasource: '=',
      // currentActivity: '@'
    },
    templateUrl: 'modules/comments/views/comment-container.html',
    controller: function($scope, Comments) {

      $scope.commentEditing = false;
      $scope.commentValue = '';

      $scope.closeComments = function($event) {
        $event.stopPropagation();
        $scope.$parent.collapsed = true;
      };

      $scope.triggerCommentEdit = function($event) {
        $event.stopPropagation();
        $scope.commentEditing = true;
      };

      $scope.cancelCommentEdit = function($event) {
        $event.stopPropagation();
        angular.element($event.target).closest('commentcontainer').find('.ta-comment').attr('style','');
        $scope.commentValue = '';
        $scope.commentEditing = false;
      };

      $scope.addComment = function($event) {
        $event.stopPropagation();
        var params = {
          'content': $scope.commentValue,
          'dateTime': new Date(),
          'activity': $scope.$parent.activity
        }
        var newComment = Comments.save(params, function() {
          $scope.datasource.pop(newComment);
          $scope.cancelCommentEdit($event);
        });
      };

    }
  }
});