'use strict';

angular.module('comments').directive('commentitem', function() {
  return {
    restrict: 'E',
    scope: {
      datasource: '='
    },
    templateUrl: 'modules/comments/views/comment-item.html',
    controller: function($scope, Comments) {

    }
  }
});