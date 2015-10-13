'use strict';

angular.module('comments').directive('commenteditor', function() {
  return {
    restrict: 'E',
    scope: {
      activityId: '@'
    },
    templateUrl: 'modules/comments/views/comment-editor.html',
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
        angular.element($event.target).closest('commenteditor').find('.ta-comment').attr('style','');
        $scope.commentValue = '';
        $scope.commentEditing = false;
      };

      $scope.addComment = function($event) {
        $event.stopPropagation();
        var params = {
          'content': $scope.commentValue,
          'dateTime': new Date(),
          'activity': $scope.activityId
        };

        Comments.save(params, function(newComment) {
          $scope.$parent.$broadcast("newComment", newComment);
          $scope.cancelCommentEdit($event);
        });
      };

    }
  }
});