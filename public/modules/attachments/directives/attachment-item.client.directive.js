'use strict';

angular.module('attachments').directive('attachmentitem', function() {
  return {
    restrict: 'E',
    scope: {
      attachment: '=datasource'
    },
    templateUrl: 'modules/attachments/views/attachment-item.html',
    controller: function($scope, Comments) {

      $scope.comments = Comments.query({ attachment: $scope.attachment._id });


    }
  };
});